import { createContext } from 'react';
import { Alert, HAPPY_PERSON_ALERT } from '@ailert/model-types';

type AlertContextType = {
  alert: Alert;
  setAlert: (alert: Alert) => void;
};

export const AlertContext = createContext<AlertContextType>({
  alert: HAPPY_PERSON_ALERT,
  setAlert: (alert: Alert) => {
    //
  },
});
