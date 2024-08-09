import { HttpsError, onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import {
  addAlertDataDB,
  getAllUsersByAuthIdDB,
  updateAlertDataDB,
} from '../utils';
import { AlertData } from '@ailert/model-types';

export const addAlertData = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    // Get data passed from the client.
    const { risk, message, image64 } = request.data;

    // Checking that the user is authenticated.
    if (!request.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError(
        'failed-precondition',
        'The function must be ' + 'called while authenticated.',
      );
    }

    const uid = request.auth.uid;
    const users = await getAllUsersByAuthIdDB(uid);
    // Checking if one user was found
    if (users.length !== 1) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError(
        'failed-precondition',
        'The user must exist and be unique.',
      );
    }
    const userId = users[0].id;

    const alertData = { risk, message, image64 } as AlertData;
    // Add alert data to Firestore
    await addAlertDataDB(userId, alertData);

    // Add to the last alert data
    await updateAlertDataDB(userId, 'last', alertData);

    // logger.info('New Alert Data added');
    return { status: 'success' };
  },
);
