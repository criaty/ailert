import { Container } from '@mui/material';
import { AlertPopup } from '@ailert/ui';

export const HomePage = () => {
  return (
    <Container maxWidth="xl" disableGutters sx={{ height: '80vh' }}>
      <AlertPopup />
    </Container>
  );
};
