import { GenerativeModel } from '@google/generative-ai';
import { createContext } from 'react';

type ModelContextType = {
  model: GenerativeModel | undefined;
  setApiKey: (apiKey: string) => void;
};

export const ModelContext = createContext<ModelContextType>({
  model: undefined,
  setApiKey: (apiKey: string) => {
    //
  },
});
