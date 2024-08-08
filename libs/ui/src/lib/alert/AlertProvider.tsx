import { PropsWithChildren, useState } from 'react';
import { Alert, CHILD_IN_DANGER_ALERT } from '@ailert/model-types';
import { AlertContext } from './AlertContext';

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [alert, setAlert] = useState<Alert>(CHILD_IN_DANGER_ALERT);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
