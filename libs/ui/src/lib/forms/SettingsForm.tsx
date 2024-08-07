import { useContext, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { ModelContext } from '../gemini';

export const SettingsForm = () => {
  const { t } = useTranslation();
  const [interval, setInterval] = useState(
    () => sessionStorage.getItem('interval') || 60,
  );
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem('apiKey') || '',
  );
  const { setApiKey: setApiKeyModel } = useContext(ModelContext);

  const saveSettings = () => {
    sessionStorage.setItem('interval', interval.toString());
    sessionStorage.setItem('apiKey', apiKey);
    setApiKeyModel(apiKey);
    enqueueSnackbar(t('ui:settings-save-success'));
  };

  return (
    <Stack direction="column" gap={8} alignItems="center">
      <Grid container spacing={4} maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('ui:settings-title')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="label-interval" required>
              {t('ui:label.interval')}
            </InputLabel>
            <Select
              labelId="label-interval"
              id="interval"
              value={interval}
              label={t('ui:label.interval')}
              onChange={(e) => setInterval(e.target.value as number)}
            >
              <MenuItem value="4">{t('ui:option.interval4')}</MenuItem>
              <MenuItem value="6">{t('ui:option.interval6')}</MenuItem>
              <MenuItem value="10">{t('ui:option.interval10')}</MenuItem>
              <MenuItem value="15">{t('ui:option.interval15')}</MenuItem>
              <MenuItem value="30">{t('ui:option.interval30')}</MenuItem>
              <MenuItem value="60">{t('ui:option.interval60')}</MenuItem>
            </Select>
            <Typography variant="caption" mt={1} ml={2}>
              {t('ui:label.interval-description')}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label={t('ui:label.api-key')}
            placeholder={t('ui:label.api-key-placeholder')}
            type="text"
            fullWidth
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{ visibility: apiKey ? 'visible' : 'hidden' }}
                  onClick={() => setApiKey('')}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
            required
          />
          <Typography variant="caption" mt={1} ml={2}>
            {t('ui:label.api-key-description-1')}
            <Link href={t('ui:label.api-key-description-2')} target="_blank">
              {t('ui:label.api-key-description-2')}
            </Link>
            {t('ui:label.api-key-description-3')}
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={saveSettings} disabled={!apiKey}>
        {t('ui:button.save')}
      </Button>
    </Stack>
  );
};
