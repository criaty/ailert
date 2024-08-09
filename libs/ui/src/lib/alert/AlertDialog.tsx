import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

import { Alert } from '@ailert/model-types';

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

  // Fields
  const [title, setTitle] = useState(alert.title || '');
  const [description, setDescription] = useState(alert.description || '');
  const [imageUrl, setImageUrl] = useState(alert.imageUrl || '');
  const [contextToWatch, setContextToWatch] = useState(
    alert.contextToWatch || '',
  );
  const [outputMessage, setOutputMessage] = useState(alert.outputMessage || '');
  const [webhookUrl, setWebhookUrl] = useState(alert.webhookUrl || '');
  const [webhookKey, setWebhookKey] = useState(alert.webhookKey || '');

  const isDisabled = () => {
    // TODO
    return false;
  };

  const onSaveAlert = () => {
    // TODO
  };

  const getEndAdornment = (
    value: string,
    setValue: (value: string) => void,
  ) => (
    <IconButton
      sx={{ visibility: value ? 'visible' : 'hidden' }}
      onClick={() => setValue('')}
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
        />
        {/* <TextField
          margin="dense"
          label={t('ui:label.imageUrl')}
          placeholder={t('ui:placeholder.imageUrl')}
          type="text"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          InputProps={{
            endAdornment: getEndAdornment(imageUrl, setImageUrl),
          }}
          required
        /> */}
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
        />
      </DialogContent>
    </Dialog>
  );
};
