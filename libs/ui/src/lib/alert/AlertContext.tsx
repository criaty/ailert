import { createContext } from 'react';
import { Alert, CHILD_IN_DANGER_ALERT } from '@ailert/model-types';

type AlertContextType = {
  alert: Alert;
  setAlert: (alert: Alert) => void;
};

export const AlertContext = createContext<AlertContextType>({
  alert: CHILD_IN_DANGER_ALERT,
  setAlert: (alert: Alert) => {
    //
  },
});
