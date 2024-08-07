import { PropsWithChildren, useEffect, useState } from 'react';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ModelContext } from './ModelContext';

export const ModelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [model, setModel] = useState<GenerativeModel>();

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    if (!apiKey) return;
    setApiKey(apiKey);
  }, []);

  const setApiKey = (apiKey: string) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    setModel(model);
  };

  return (
    <ModelContext.Provider value={{ model, setApiKey }}>
      {children}
    </ModelContext.Provider>
  );
};
