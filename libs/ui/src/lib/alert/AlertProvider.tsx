import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, HAPPY_PERSON_ALERT } from '@ailert/model-types';
import { AlertContext } from './AlertContext';

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState<Alert>({
    ...HAPPY_PERSON_ALERT,
    title: t(HAPPY_PERSON_ALERT.title),
    description: t(HAPPY_PERSON_ALERT.description),
  });
  const [alertList, setAlertList] = useState<Alert[]>([]);

  return (
    <AlertContext.Provider value={{ alert, setAlert, alertList, setAlertList }}>
      {children}
    </AlertContext.Provider>
  );
};
