import { onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import { getAlertDataDB, getUserId } from '../utils';

export const getAlertData = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    const userId = await getUserId(request.auth);

    // Get alerts from Firestore
    return await getAlertDataDB(userId);
  },
);
