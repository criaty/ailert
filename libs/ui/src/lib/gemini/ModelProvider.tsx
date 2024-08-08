import { PropsWithChildren, useEffect, useState } from 'react';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ModelContext } from './ModelContext';

export const ModelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [model, setModel] = useState<GenerativeModel>();
  const [updateInterval, setUpdateInterval] = useState<number>();

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    apiKey && setApiKey(apiKey);
    const updateInterval = sessionStorage.getItem('updateInterval');
    updateInterval && setUpdateInterval(parseInt(updateInterval));
  }, []);

  const setApiKey = (apiKey: string) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    setModel(model);
  };

  return (
    <ModelContext.Provider
      value={{ model, setApiKey, updateInterval, setUpdateInterval }}
    >
      {children}
    </ModelContext.Provider>
  );
};
