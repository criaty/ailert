import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';

import { getFunctions } from '@blockium/firebase';
import { httpsCallable } from 'firebase/functions';

import { AlertData } from '@ailert/model-types';
import { AlertDataCard } from './AlertDataCard';

export const AlertDataList = () => {
  const { t } = useTranslation();

  const [alertData, setAlertData] = useState<AlertData[]>([]);

  // Get Alert Data
  useEffect(() => {
    const getAlertData = httpsCallable(getFunctions(), 'getAlertData');
    getAlertData()
      .then((result) => {
        const alertData = result.data as AlertData[];
        setAlertData(alertData);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(t('ui:error.onAlertDataGet'), { variant: 'error' });
      });
  }, [t]);

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t('ui:alertData-list-title')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t('ui:alertData-list-message')}
      </Typography>
      <Box
        component={'div'}
        gap={4}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        py={0}
      >
        {alertData.map((alertData) => (
          <AlertDataCard key={alertData.id} alertData={alertData} />
        ))}
      </Box>
      {/* Show a message when there is no alert data yet */}
      {alertData.length === 0 && (
        <Typography variant="body1" sx={{ mt: 4 }}>
          {t('ui:alertData-empty-list-message')}
        </Typography>
      )}
    </>
  );
};
