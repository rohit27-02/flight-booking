/* eslint-disable */
import functions = require('firebase-functions');
import * as admin from 'firebase-admin';
import sgMail = require('@sendgrid/mail');

admin.initializeApp();
const db = admin.firestore();

sgMail.setApiKey(functions.config().sendgrid.key);

exports.updateFlightDetails = functions.https.onRequest(
  async (req: any, res: any) => {
    if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Method not allowed' });
    }

    const { flightId, updatedFlightDetails } = req.body;

    try {
      const subscriptionsSnapshot = await db
        .collection('subscriptions')
        .where('flightId', '==', flightId)
        .get();

      if (subscriptionsSnapshot.empty) {
        return res
          .status(200)
          .send({ message: 'No subscribers for this flight.' });
      }

      const emails: string[] = [];
      subscriptionsSnapshot.forEach((doc) => {
        emails.push(doc.data().email);
      });

      const msg = {
        to: emails,
        from: 'rohitrawatop@gmail.com', // Change to your verified sender
        subject: `Update on Flight ${flightId}`,
        text: `The flight details have been updated. Here are the new details:\n${JSON.stringify(
          updatedFlightDetails,
          null,
          2
        )}`,
      };

      await sgMail.sendMultiple(msg);

      res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending email', error);
      res.status(500).send({ message: 'Failed to send email' });
    }
  }
);
