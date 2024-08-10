import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, DEFAULT_ALERTS, HAPPY_PERSON_ALERT } from '@ailert/model-types';
import { AlertContext } from './AlertContext';

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState<Alert>({
    ...HAPPY_PERSON_ALERT,
    title: t(HAPPY_PERSON_ALERT.title),
    description: t(HAPPY_PERSON_ALERT.description),
  });
  const [alertList, setAlertList] = useState<Alert[]>(() =>
    DEFAULT_ALERTS.map((alert) => ({
      ...alert,
      title: t(alert.title),
      description: t(alert.description),
      contextToWatch: t(alert.contextToWatch),
      outputMessage: t(alert.outputMessage),
    })),
  );

  return (
    <AlertContext.Provider value={{ alert, setAlert, alertList, setAlertList }}>
      {children}
    </AlertContext.Provider>
  );
};
