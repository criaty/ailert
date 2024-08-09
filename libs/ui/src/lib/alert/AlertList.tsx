import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';

import { Alert, DEFAULT_ALERTS } from '@ailert/model-types';
import { AlertCard } from './AlertCard';
import { AlertContext } from './AlertContext';
import { AlertDialog } from './AlertDialog';

export const AlertList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [currAlert, setCurrAlert] = useState<Alert>({} as Alert);

  // TODO: Add user defined alerts. Create an AlertContext to store them
  const alerts = DEFAULT_ALERTS.map((alert) => ({
    ...alert,
    title: t(alert.title),
    description: t(alert.description),
    contextToWatch: t(alert.contextToWatch),
    outputMessage: t(alert.outputMessage),
  }));

  const onSelectAlert = (alertIndex: number) => {
    // Add selected alert to the context
    const alert = alerts[alertIndex];
    setAlert(alert);
    // Navigate to the camera page
    navigate('/camera');
  };

  const onAddAlert = () => {
    // Open a dialog to add a new alert
    setCurrAlert({} as Alert);
    setOpenDialog(true);
  };

  const onEditAlert = (alertIndex: number) => {
    // Open a dialog to edit a alert
    const alert = alerts[alertIndex];
    setCurrAlert(alert);
    setOpenDialog(true);
  };

  const onDeleteAlert = (alertIndex: number) => {
    // TODO: Delete the alert
    const alert = alerts[alertIndex];
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const onViewAlerts = () => {
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
          onClick={onAddAlert}
          variant="outlined"
          sx={{ p: '2rem 3rem' }}
          fullWidth
        >
          {t('ui:button.add-alert')}
        </Button>
        <Button
          onClick={onViewAlerts}
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
            onClick={() => onSelectAlert(index)}
          />
        ))}
      </Box>
      <AlertDialog
        open={openDialog}
        onClose={onCloseDialog}
        alert={currAlert}
      />
    </>
  );
};
