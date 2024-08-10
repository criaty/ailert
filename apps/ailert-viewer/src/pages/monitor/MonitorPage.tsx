import { Container } from '@mui/material';
import { AlertDataPopup } from '@ailert/ui';

export const MonitorPage = () => {
  return (
    <Container maxWidth="xl" disableGutters sx={{ height: '80vh' }}>
      <AlertDataPopup />
    </Container>
  );
};
