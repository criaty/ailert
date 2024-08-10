import { onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import { getAlertsDB, getUserId } from '../utils';

export const getAlerts = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    const userId = await getUserId(request.auth);

    // Get alerts from Firestore
    return await getAlertsDB(userId);
  },
);
