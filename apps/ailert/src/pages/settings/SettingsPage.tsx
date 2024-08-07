import { SettingsForm } from '@ailert/ui';
import { Container, useTheme } from '@mui/material';

export const SettingsPage = () => {
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
      <SettingsForm />
    </Container>
  );
};
