import { onRequest } from 'firebase-functions/v2/https';
// import { logger } from 'firebase-functions/v2';

const DEFAULT_HOOK_KEY = 'criaty-ailert';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateParams = (request: any, response: any) => {
  const { image64, risk, message, key } = request.body;
  if (!image64 || !risk || !message || !key) {
    response.status(400).send('Missing data');
    return false;
  }
  if (key !== DEFAULT_HOOK_KEY) {
    response.status(403).send('Invalid webhook key');
    return false;
  }
  return true;
};

export const happyPersonAlert = onRequest(
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request, response) => {
    if (!validateParams(request, response)) return;

    // TODO: Should not receive userId
    try {
      // const { risk, message, image64 } = request.body;
      // TODO: Save the alert data to /webhooks/happyPersonAlert/alerts

      // logger.info('happyPersonAlert webhook called');

      response.status(200).send('happyPersonAlert webhook called');
    } catch (error) {
      console.log(error);
      response.status(424).send('There was an error on webhook call');
    }
  },
);
