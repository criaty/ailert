import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';

import { getFunctions } from '@blockium/firebase';
import { httpsCallable } from 'firebase/functions';

import { Alert, DEFAULT_ALERTS } from '@ailert/model-types';
import { AlertContext } from './AlertContext';

export const useGetAlerts = () => {
  const { t } = useTranslation();
  const { setAlertList } = useContext(AlertContext);

  // Get user defined alerts.
  const getAlerts = () => {
    const getAlerts = httpsCallable(getFunctions(), 'getAlerts');
    getAlerts()
      .then((result) => {
        const alerts = result.data as Alert[];
        const defaultAlerts = DEFAULT_ALERTS.map((alert) => ({
          ...alert,
          title: t(alert.title),
          description: t(alert.description),
          contextToWatch: t(alert.contextToWatch),
          outputMessage: t(alert.outputMessage),
        }));
        setAlertList([...alerts, ...defaultAlerts]);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(t('ui:error.onAlertsGet'), { variant: 'error' });
      });
  };

  return { getAlerts };
};
