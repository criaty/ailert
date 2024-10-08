import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Alert } from '@ailert/model-types';
import { AlertDialog } from './AlertDialog';

import { getFunctions } from '@blockium/firebase';
import { httpsCallable } from 'firebase/functions';

import { ConfirmDialog } from '@blockium/ui';
import { AlertContext } from './AlertContext';

type AlertCardProps = {
  alert: Alert;
  maxHeight?: number | string | object;
  onClick?: VoidFunction;
};

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  maxHeight = 440,
  onClick,
}) => {
  const { t } = useTranslation();
  const { title, description, imageUrl } = alert;
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const { alertList, setAlertList } = useContext(AlertContext);

  const onEditAlert = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // Open a dialog to edit a alert
    setOpenDialog(true);
  };

  const onDeleteAlert = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenConfirmDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    setOpenConfirmDelete(false);
    const deleteAlert = httpsCallable(getFunctions(), 'deleteAlert');
    try {
      await deleteAlert({ alertId: alert.id });
      // Remove the alert from the list in the context
      alertList.splice(
        alertList.findIndex((a) => a.id === alert.id),
        1,
      );
      setAlertList([...alertList]);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(t('ui:error.onAlertDelete'), { variant: 'error' });
    }
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ opacity: 0.8, scale: 1.05 }}
        transition={{ ease: 'easeIn' }}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <Card
          sx={{
            height: '100%',
            maxHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {imageUrl ? (
            <CardMedia
              component="img"
              height="160px"
              image={imageUrl}
              alt={title}
            />
          ) : (
            <Box
              sx={{
                height: '160px',
                backgroundColor: 'grey.300',
              }}
            />
          )}
          <CardContent sx={{ height: '220px' }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Box height="100%" overflow="auto">
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ height: '60px' }}>
            <Button onClick={onEditAlert} size="small">
              {t('ui:button.edit')}
            </Button>
            <Button
              onClick={onDeleteAlert}
              size="small"
              disabled={alert.isDefault}
            >
              {t('ui:button.delete')}
            </Button>
          </CardActions>
        </Card>
      </motion.div>
      <AlertDialog open={openDialog} onClose={onCloseDialog} alert={alert} />
      <ConfirmDialog
        open={openConfirmDelete}
        title={t('ui:dialog.deleteAlert.title')}
        message={t('ui:dialog.deleteAlert.message', { title: alert.title })}
        onConfirm={handleDeleteConfirmed}
        onClose={() => setOpenConfirmDelete(false)}
        confirmColor="error"
      />
    </>
  );
};
