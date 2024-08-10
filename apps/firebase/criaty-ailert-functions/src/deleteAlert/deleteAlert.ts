import { onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import { deleteAlertDB, getUserId } from '../utils';

export const deleteAlert = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    const userId = await getUserId(request.auth);

    // Delete alert from Firestore
    return await deleteAlertDB(userId, request.data.alertId);
  },
);
