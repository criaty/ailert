import { onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import { addAlertDataDB, getUserId, updateAlertDataDB } from '../utils';
import { AlertData } from '@ailert/model-types';

export const addAlertData = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    const userId = await getUserId(request.auth);

    // Get data passed from the client.
    const { risk, message, title, image64 } = request.data;

    const alertData = { risk, message, title, image64 } as AlertData;
    // Add alert data to Firestore
    await addAlertDataDB(userId, alertData);

    // Add to the last alert data
    await updateAlertDataDB(userId, 'last', alertData);

    // logger.info('New Alert Data added');
    return { status: 'success' };
  },
);
