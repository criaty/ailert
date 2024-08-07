import { useContext } from 'react';
import { CHILD_IN_DANGER_ALERT } from '@ailert/model-types';
import { ModelContext } from './ModelContext';
import { promptFromAlert } from './prompts';

export const useImageUpdate = () => {
  const { model } = useContext(ModelContext);

  const onImageUpdate = async (image64: string) => {
    const prompt = promptFromAlert(CHILD_IN_DANGER_ALERT);
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
