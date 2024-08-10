import { onCall } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';
import { getUserId, updateAlertDB } from '../utils';
import { Alert } from '@ailert/model-types';

export const updateAlert = onCall(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request) => {
    const userId = await getUserId(request.auth);

    const {
      id,
      title,
      description,
      imageUrl,
      contextToWatch,
      outputMessage,
      voiceOption,
      webhookUrl,
      webhookKey,
      createdAt,
    } = request.data;

    const alert = {
      id,
      title,
      description,
      imageUrl,
      contextToWatch,
      outputMessage,
      voiceOption,
      webhookUrl,
      webhookKey,
      createdAt,
    } as Alert;

    // Update alert data on Firestore
    await updateAlertDB(userId, alert);

    // logger.info('Alert updated');
    return { status: 'success' };
  },
);
