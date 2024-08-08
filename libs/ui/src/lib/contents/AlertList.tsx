import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { AlertCard } from './AlertCard';

export const AlertList = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" sx={{ mb: 5 }}>
        {t('ui:alert-list-title')}
      </Typography>
      <Box
        component={'div'}
        gap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        // bgcolor="background.paper"
        // borderRadius={{ xs: '0px 0px 16px 16px', md: '0px 16px 16px 0px' }}
        py={0}
      >
        <AlertCard title={'Alerta 1'} description={'Description 1'} />
        <AlertCard title={'Alerta 2'} description={'Description 2'} />
        <AlertCard title={'Alerta 3'} description={'Description 3'} />
      </Box>
    </>
  );
};
