'use client'
import { Flight } from '@/containers/(main)/flights/flight-list';
import React, { useEffect, useState } from 'react';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedFlight: Flight) => void;
    flight: Flight | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit, flight }) => {
    const [formData, setFormData] = useState<Flight | null>(flight);

    useEffect(() => {
        setFormData(flight);
    }, [flight]);

    if (!isOpen || !formData) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 border border-black rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Flight</h2>
                <div className="space-y-4">
                    <input type="text" name="airline" value={formData.airline} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Airline" />
                    <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Status" />
                    <input type="text" name="departure_gate" value={formData.departure_gate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Departure Gate" />
                    <input type="text" name="arrival_gate" value={formData.arrival_gate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Arrival Gate" />
                    <input type="text" name="scheduled_departure" value={formData.scheduled_departure} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Scheduled Departure" />
                    <input type="text" name="scheduled_arrival" value={formData.scheduled_arrival} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" placeholder="Scheduled Arrival" />
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 bg-gray-200 text-gray-700 py-2 px-4 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="bg-indigo-600 text-white py-2 px-4 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
