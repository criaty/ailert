import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ModelContext } from './ModelContext';

export const ModelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [model, setModel] = useState<GenerativeModel>();
  const [updateInterval, setUpdateInterval] = useState<number>();

  const setApiKey = useCallback((apiKey: string) => {
    const generationConfig = {
      temperature: 0.3,
      // topK: 0.2,
      // topP: 0.2,
      maxOutputTokens: 2048,
      response_mime_type: 'application/json',
    };

    // const safetySettings = [
    //   {
    //     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //   },
    //   {
    //     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //   },
    //   {
    //     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //   },
    //   {
    //     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //   },
    // ];

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig,
    });
    setModel(model);
  }, []);

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey');
    apiKey && setApiKey(apiKey);
    const updateInterval = sessionStorage.getItem('updateInterval');
    updateInterval && setUpdateInterval(parseInt(updateInterval));
  }, [setApiKey]);

  return (
    <ModelContext.Provider
      value={{ model, setApiKey, updateInterval, setUpdateInterval }}
    >
      {children}
    </ModelContext.Provider>
  );
};
