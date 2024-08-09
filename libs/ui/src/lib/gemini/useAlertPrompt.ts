import { useTranslation } from 'react-i18next';
import { Alert } from '@ailert/model-types';

export const useAlertPrompt = (alert: Alert): string => {
  const { t } = useTranslation();
  const prompt = t('ui:alert-prompt', {
    contextToWatch: t(alert.contextToWatch),
    outputMessage: t(alert.outputMessage),
  });

  //   const prompt = `
  // Check the image and find the risk for "${alert.contextToWatch}".
  // Respond in JSON format:
  // {
  //   "risk": "", // LOW, MEDIUM, or HIGH in uppercase
  //   "message": "" // ${alert.outputMessage}
  // }
  //   `;

  console.log(prompt);
  return prompt;
};
