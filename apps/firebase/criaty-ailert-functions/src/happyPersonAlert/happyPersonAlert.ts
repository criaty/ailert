import { onRequest } from 'firebase-functions/v2/https';
import { addAlert } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateParams = (request: any, response: any) => {
  const { image64, risk, message, key, userId } = request.body;
  if (!image64 || !risk || !message || !key || !userId) {
    response.status(400).send('Missing data');
    return false;
  }
  if (key !== 'criaty-ailert') {
    response.status(403).send('Invalid webhook key');
    return false;
  }
  return true;
};

export const happyPersonAlert = onRequest(
  // concurrency: 80 is default
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request, response) => {
    if (!validateParams(request, response)) return;

    try {
      const { risk, message, image64, userId } = request.body;

      // Add alert to Firestore
      const alertData = { risk, message, image64 };
      await addAlert(alertData, userId);

      // TODO: Add last alert

      response.status(200).send('Alert was added');
    } catch (error) {
      console.log(error);
      response.status(424).send('There was an error adding the alert');
    }
  },
);
