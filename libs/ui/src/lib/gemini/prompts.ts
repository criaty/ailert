import { Alert } from '@ailert/model-types';

export const promptFromAlert = (alert: Alert): string => {
  const prompt = `
Check the image and find the risk for "${alert.contextToWatch}".
Respond in JSON format:
{
  "risk": "", // LOW, MEDIUM, or HIGH in uppercase
  "message": "" // ${alert.outputMessage}
}
  `;
  return prompt;
};
