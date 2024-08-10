import { AlertDataList } from '@ailert/ui';
import { Container, useTheme } from '@mui/material';

export const AlertsPage = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(1),
      }}
    >
      <AlertDataList />
    </Container>
  );
};
