'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import EmailModal from '@/components/email-modal';
import EditModal from '@/components/edit-modal';
import { flights } from './mocks/flight.mock';
import { messaging, getToken, onMessage } from '@/config/firebase.config';
import { subscribeUser } from '@/actions/subscribe-user';
import { sendNotification } from '@/actions/send-notification'; // Import the server action

export interface Flight {
  flight_id: string;
  airline: string;
  status: string;
  departure_gate: string;
  arrival_gate: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  actual_departure: string | null;
  actual_arrival: string | null;
}

const FlightList: React.FC = () => {
  const [subscribedFlights, setSubscribedFlights] = useState<string[]>([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState<Flight | null>(null);
  const [flightData, setFlightData] = useState<Flight[]>(flights);

  useEffect(() => {
    requestNotificationPermission();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      toast(`New notification: ${payload.notification?.title}`);
    });
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: process.env.VAPID_KEY });
        console.log('FCM Token:', token);
      } else {
        toast.error('Notification permission denied');
      }
    } catch (error) {
      console.error('Error getting permission', error);
    }
  };

  const handleSubscribe = (flight: Flight) => {
    setCurrentFlight(flight);
    setIsEmailModalOpen(true);
  };

  const handleEdit = (flight: Flight) => {
    setCurrentFlight(flight);
    setIsEditModalOpen(true);
  };

  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false);
    setCurrentFlight(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentFlight(null);
  };

  const handleEmailModalSubmit = async (email: string) => {
    if (currentFlight) {
      setSubscribedFlights((prev) => [...prev, currentFlight.flight_id]);
      setIsEmailModalOpen(false);
      setCurrentFlight(null);
      toast.success(`Subscribed to notifications for flight ${currentFlight.flight_id}`, {
        position: "top-right",
        duration: 4000
      });
      try {
        await subscribeUser({ flightId: currentFlight.flight_id, email });
      } catch (error) {
        toast.error('Failed to subscribe to flight notifications');
      }
    }
  };

  const handleEditModalSubmit = async (updatedFlight: Flight) => {
    setFlightData((prev) => prev.map(flight => flight.flight_id === updatedFlight.flight_id ? updatedFlight : flight));
    toast.success(`Updated details for flight ${updatedFlight.flight_id}`, {
      position: "top-right",
      duration: 4000
    });

    // Call the server action to send a notification
    try {
      await sendNotification(updatedFlight.flight_id, updatedFlight);
    } catch (error) {
      toast.error('Failed to send notification');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Flight Status</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flightData.map((flight) => (
          <div key={flight.flight_id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-indigo-600">{flight.flight_id}</h2>
            <p className="text-gray-700 mt-2">Airline: <span className="font-medium">{flight.airline}</span></p>
            <p className={`text-gray-700 mt-2 ${flight.status === 'Delayed' ? 'text-red-500' : flight.status === 'Cancelled' ? 'text-gray-500' : 'text-green-500'}`}>
              Status: <span className="font-medium">{flight.status}</span>
            </p>
            <p className="text-gray-700 mt-2">Departure Gate: <span className="font-medium">{flight.departure_gate}</span></p>
            <p className="text-gray-700 mt-2">Arrival Gate: <span className="font-medium">{flight.arrival_gate}</span></p>
            <p className="text-gray-700 mt-2">Scheduled Departure: <span className="font-medium">{flight.scheduled_departure}</span></p>
            <p className="text-gray-700 mt-2">Scheduled Arrival: <span className="font-medium">{flight.scheduled_arrival}</span></p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleSubscribe(flight)}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
              <button
                onClick={() => handleEdit(flight)}
                className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={handleEmailModalClose}
        onSubmit={handleEmailModalSubmit}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditModalSubmit}
        flight={currentFlight}
      />
    </div>
  );
};

export default FlightList;
