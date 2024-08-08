import { GenerativeModel } from '@google/generative-ai';
import { createContext } from 'react';

type ModelContextType = {
  model?: GenerativeModel;
  setApiKey: (apiKey: string) => void;
  updateInterval?: number;
  setUpdateInterval: (updateInterval: number) => void;
};

export const ModelContext = createContext<ModelContextType>({
  model: undefined,
  setApiKey: (apiKey: string) => {
    //
  },
  updateInterval: undefined,
  setUpdateInterval: (updateInterval: number) => {
    //
  },
});
