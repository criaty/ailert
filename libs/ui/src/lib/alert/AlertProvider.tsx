import { PropsWithChildren, useState } from 'react';
import { Alert, HAPPY_PERSON_ALERT } from '@ailert/model-types';
import { AlertContext } from './AlertContext';
import { useTranslation } from 'react-i18next';

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState<Alert>({
    ...HAPPY_PERSON_ALERT,
    title: t(HAPPY_PERSON_ALERT.title),
    description: t(HAPPY_PERSON_ALERT.description),
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
