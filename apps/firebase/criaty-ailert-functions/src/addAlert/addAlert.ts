import { onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import { addAlertDB, getUserId } from '../utils';
import { Alert } from '@ailert/model-types';

export const addAlert = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    const userId = await getUserId(request.auth);

    const {
      title,
      description,
      imageUrl,
      contextToWatch,
      outputMessage,
      voiceOption,
      webhookUrl,
      webhookKey,
    } = request.data;

    const alert = {
      title,
      description,
      imageUrl,
      contextToWatch,
      outputMessage,
      voiceOption,
      webhookUrl,
      webhookKey,
    } as Alert;

    // Add alert data to Firestore
    const addedAlert = await addAlertDB(userId, alert);

    // logger.info('New Alert added');
    return { status: 'success', alert: addedAlert };
  },
);
