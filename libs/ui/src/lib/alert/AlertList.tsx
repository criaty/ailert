import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';

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

  const onAddAlertClick = () => {
    // TODO: Open a dialog to add a new alert
  };

  const onViewAlertsClick = () => {
    // Open a new browser tab to view all alerts
    window.open(import.meta.env.VITE_AILERT_VIEWER_APP_URL, '_blank');
  };

  const onCameraClick = () => {
    navigate('/camera');
  };

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t('ui:alert-list-title')}
      </Typography>
      <Stack direction="row" gap={2} mb={5}>
        <Button
          onClick={onAddAlertClick}
          variant="outlined"
          sx={{ p: '2rem 3rem' }}
          fullWidth
        >
          {t('ui:button.add-alert')}
        </Button>
        <Button
          onClick={onViewAlertsClick}
          variant="outlined"
          sx={{ p: '2rem 3rem' }}
          fullWidth
        >
          {t('ui:button.view-alerts')}
        </Button>
        <Button
          onClick={onCameraClick}
          variant="outlined"
          sx={{ p: '2rem 3rem' }}
          fullWidth
        >
          {t('ui:button.camera')}
        </Button>
      </Stack>
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
