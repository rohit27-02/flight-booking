// app/actions/sendNotification.ts
'use server';

export async function sendNotification(flightId: string, updatedFlightDetails: any) {
  try {
    const response = await fetch(`https://${process.env.FIREBASE_PROJECT_ID}.cloudfunctions.net/updateFlightDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flightId, updatedFlightDetails }),
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message || 'Failed to update flight details');
    }
  } catch (error) {
    console.error('Error calling Firebase Cloud Function', error);
    throw new Error('Failed to send notification');
  }
}
