import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';

export const NoApiKey = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goSettings = () => {
    navigate('/settings');
  };

  return (
    <Stack direction="column" gap={8} alignItems="center">
      <Box>
        <Typography variant="h6" textAlign="center">
          {t('ui:label.no-api-key-1')}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {t('ui:label.no-api-key-2')}
        </Typography>
      </Box>
      <Button variant="contained" onClick={goSettings}>
        {t('ui:button.settings')}
      </Button>
    </Stack>
  );
};
