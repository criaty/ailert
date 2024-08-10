import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Clear as ClearIcon } from '@mui/icons-material';

import { useIsMobile } from '@blockium/ui';

import { getFunctions } from '@blockium/firebase';
import { httpsCallable } from 'firebase/functions';

import { Alert } from '@ailert/model-types';
import { AlertContext } from './AlertContext';

type AlertDialogProps = {
  open: boolean;
  onClose: VoidFunction;
  alert: Alert;
};

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  alert,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { alertList } = useContext(AlertContext);

  // Fields
  const [title, setTitle] = useState(alert.title || '');
  const [description, setDescription] = useState(alert.description || '');
  const [contextToWatch, setContextToWatch] = useState(
    alert.contextToWatch || '',
  );
  const [outputMessage, setOutputMessage] = useState(alert.outputMessage || '');
  const [webhookUrl, setWebhookUrl] = useState(alert.webhookUrl || '');
  const [webhookKey, setWebhookKey] = useState(alert.webhookKey || '');

  const isDisabled = () => {
    // Return true if any of the required fields are empty
    if (!title || !description || !contextToWatch || !outputMessage) {
      return true;
    }
    return false;
  };

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setContextToWatch('');
    setOutputMessage('');
    setWebhookUrl('');
    setWebhookKey('');
  };

  const onSaveAlert = async () => {
    const addAlert = httpsCallable(getFunctions(), 'addAlert');
    try {
      const newAlert: Alert = {
        title,
        description,
        contextToWatch,
        outputMessage,
        webhookUrl,
        webhookKey,
        imageUrl: '',
      };
      // TODO: Add image

      const result = (await addAlert(newAlert)) as unknown as {
        data: {
          status: string;
          alert: Alert;
        };
      };

      // Add alert to the user's AlertProvider
      alertList.unshift(result.data.alert);

      enqueueSnackbar(t('ui:success.onAlertAdd'));
      clearFields();
      onClose();
      //
    } catch (error) {
      console.log(error);
      enqueueSnackbar(t('ui:error.onAlertAdd'), { variant: 'error' });
    }
  };

  const getEndAdornment = (
    value: string,
    setValue: (value: string) => void,
  ) => (
    <IconButton
      sx={{ visibility: value ? 'visible' : 'hidden' }}
      onClick={() => setValue('')}
      disabled={alert.isDefault}
    >
      <ClearIcon />
    </IconButton>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth={'sm'}
      // PaperProps={{ sx: { py: 3 } }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {alert.id ? t('ui:dialog.edit-alert') : t('ui:dialog.new-alert')}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={onSaveAlert}
            disabled={isDisabled()}
          >
            {t('ui:button.save')}
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          margin="dense"
          label={t('ui:label.title')}
          placeholder={t('ui:placeholder.title')}
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(title, setTitle),
          }}
          required
          disabled={alert.isDefault}
        />
        <TextField
          multiline
          rows={3}
          margin="dense"
          label={t('ui:label.contextToWatch')}
          placeholder={t('ui:placeholder.contextToWatch')}
          type="text"
          fullWidth
          value={contextToWatch}
          onChange={(e) => setContextToWatch(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(contextToWatch, setContextToWatch),
          }}
          required
          disabled={alert.isDefault}
        />
        <TextField
          multiline
          rows={3}
          margin="dense"
          label={t('ui:label.outputMessage')}
          placeholder={t('ui:placeholder.outputMessage')}
          type="text"
          fullWidth
          value={outputMessage}
          onChange={(e) => setOutputMessage(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(outputMessage, setOutputMessage),
          }}
          required
          disabled={alert.isDefault}
        />
        <TextField
          multiline
          rows={3}
          margin="dense"
          label={t('ui:label.description')}
          placeholder={t('ui:placeholder.description')}
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(description, setDescription),
          }}
          required
          disabled={alert.isDefault}
        />
        <TextField
          margin="dense"
          label={t('ui:label.webhookUrl')}
          placeholder={t('ui:placeholder.webhookUrl')}
          type="text"
          fullWidth
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(webhookUrl || '', setWebhookUrl),
          }}
          disabled={alert.isDefault}
        />
        <TextField
          margin="dense"
          label={t('ui:label.webhookKey')}
          placeholder={t('ui:placeholder.webhookKey')}
          type="text"
          fullWidth
          value={webhookKey}
          onChange={(e) => setWebhookKey(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(webhookKey || '', setWebhookKey),
          }}
          disabled={alert.isDefault}
        />
      </DialogContent>
    </Dialog>
  );
};
