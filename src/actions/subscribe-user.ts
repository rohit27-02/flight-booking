'use server';

import { db, collection, addDoc, serverTimestamp } from '@/config/firebase.config';

interface SubscribeUserParams {
  flightId: string;
  email: string;
}

export async function subscribeUser({ flightId, email }: SubscribeUserParams): Promise<void> {
  try {
    await addDoc(collection(db, 'subscriptions'), {
      flightId,
      email,
      subscribedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error subscribing to flight', error);
    throw new Error('Subscription failed');
  }
}
