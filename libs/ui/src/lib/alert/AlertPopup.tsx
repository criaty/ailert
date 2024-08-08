import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { doc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from '@blockium/firebase';
import { AlertData } from '@ailert/model-types';
import { useCurrentCustomer } from '../hooks';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertPopup = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [customer] = useCurrentCustomer();
  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const title =
    alertData?.risk === 'low'
      ? t('ui:alert-title-low')
      : alertData?.risk === 'medium'
        ? t('ui:alert-title-medium')
        : t('ui:alert-title-high');
  const color =
    alertData?.risk === 'low'
      ? theme.palette.background.paper
      : alertData?.risk === 'medium'
        ? '#facc15' // yellow
        : '#f87171'; // red

  useEffect(() => {
    const unsub = onSnapshot(
      doc(getFirestore(), `users/${customer.id}/alerts`, 'last'),
      (doc) => {
        const alertData = doc.data() as AlertData;
        alertData && alertData.risk !== 'low' && handleOpen(alertData);
      },
    );
    return () => unsub();
  }, [customer.id]);

  const handleOpen = (alertData: AlertData) => {
    setAlertData(alertData);
    setOpen(true);
  };

  const handleClose = () => {
    setAlertData(null);
    setOpen(false);
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center" height="100%">
        {t('ui:alert-awaiting')}
      </Stack>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          '& .MuiDialog-paper': { backgroundColor: color },
        }}
      >
        <DialogTitle color={theme.palette.grey[900]}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            color={theme.palette.grey[900]}
            id="alert-dialog-slide-description"
          >
            {alertData?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            {t('ui:button.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
