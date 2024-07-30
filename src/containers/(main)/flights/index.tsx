'use client'
import React, { useEffect } from 'react';
import FlightList from './flight-list';
import { Toaster } from 'react-hot-toast';

interface IProps { }

const FlightsIndex: React.FC<IProps> = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/firebase-messaging-sw.js')
            .then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((err) => {
              console.error('Service Worker registration failed:', err);
            });
        }
      }, []);
    return (
        <div>
            <FlightList />
            <Toaster/>
        </div>
    );
};

export default FlightsIndex;
