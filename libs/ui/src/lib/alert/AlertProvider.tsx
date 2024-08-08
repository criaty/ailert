import { PropsWithChildren, useState } from 'react';
import { Alert, CHILD_IN_DANGER_ALERT } from '@ailert/model-types';
import { AlertContext } from './AlertContext';
import { useTranslation } from 'react-i18next';

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [alert, setAlert] = useState<Alert>({
    ...CHILD_IN_DANGER_ALERT,
    title: t(CHILD_IN_DANGER_ALERT.title),
    description: t(CHILD_IN_DANGER_ALERT.description),
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
