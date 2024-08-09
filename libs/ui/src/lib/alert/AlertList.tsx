import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { DEFAULT_ALERTS } from '@ailert/model-types';
import { AlertCard } from './AlertCard';
import { AlertContext } from './AlertContext';

export const AlertList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

  // TODO: Add user defined alerts. Create an AlertContext to store them
  const alerts = DEFAULT_ALERTS.map((alert) => ({
    ...alert,
    title: t(alert.title),
    description: t(alert.description),
    contextToWatch: t(alert.contextToWatch),
    outputMessage: t(alert.outputMessage),
  }));

  const onAlertClick = (alertIndex: number) => {
    // Add selected alert to the context
    const alert = alerts[alertIndex];
    setAlert(alert);
    // Navigate to the camera page
    navigate('/camera');
  };

  return (
    <>
      <Typography variant="h3" sx={{ mb: 5 }}>
        {t('ui:alert-list-title')}
      </Typography>
      <Box
        component={'div'}
        gap={4}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        // bgcolor="background.paper"
        // borderRadius={{ xs: '0px 0px 16px 16px', md: '0px 16px 16px 0px' }}
        py={0}
      >
        {alerts.map((alert, index) => (
          <AlertCard
            key={index}
            title={alert.title}
            description={alert.description}
            imageUrl={alert.imageUrl}
            onClick={() => onAlertClick(index)}
          />
        ))}
      </Box>
    </>
  );
};
