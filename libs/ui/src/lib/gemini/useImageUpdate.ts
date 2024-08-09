import { useContext } from 'react';
import { ModelContext } from './ModelContext';
import { useAlertPrompt } from './useAlertPrompt';
import { AlertContext } from '../alert';

export const useImageUpdate = () => {
  const { model } = useContext(ModelContext);
  const { alert } = useContext(AlertContext);
  const prompt = useAlertPrompt(alert);

  const onImageUpdate = async (image64: string) => {
    const image = {
      inlineData: {
        data: image64.split(',')[1],
        mimeType: 'image/jpeg',
      },
    };

    return await model?.generateContent([prompt, image]);
  };

  return { onImageUpdate };
};
