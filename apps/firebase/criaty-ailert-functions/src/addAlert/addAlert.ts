import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { addAlertDB } from '../utils';

export const addAlert = onCall(
  { cors: [/criaty\.com$/], concurrency: 80 },
  (request) => {
    // Get data passed from the client.
    const { risk, message, image64, userId } = request.data;

    // Checking that the user is authenticated.
    if (!request.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError(
        'failed-precondition',
        'The function must be ' + 'called while authenticated.',
      );
    }

    // const uid = request.auth.uid;

    const alertData = { risk, message, image64 };
    addAlertDB(alertData, userId).then(() => {
      // TODO: Add to the last alert

      logger.info('New Alert added');
      return { status: 'success' };
    });
  },
);
