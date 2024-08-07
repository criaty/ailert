import { Alert } from '@ailert/model-types';

export const promptFromAlert = (alert: Alert): string => {
  const prompt = `
Check the image for "${alert.contextToWatch}".
Respond in ${alert.outputType} format as in the example:
${alert.outputExample}
  `;
  return prompt;
};
