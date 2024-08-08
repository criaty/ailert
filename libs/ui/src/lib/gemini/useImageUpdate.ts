import { useContext } from 'react';
import { ModelContext } from './ModelContext';
import { promptFromAlert } from './prompts';
import { AlertContext } from '../alert';

export const useImageUpdate = () => {
  const { model } = useContext(ModelContext);
  const { alert } = useContext(AlertContext);

  const onImageUpdate = async (image64: string) => {
    const prompt = promptFromAlert(alert);
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
