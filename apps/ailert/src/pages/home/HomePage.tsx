import { useContext } from 'react';
import { Container, useTheme } from '@mui/material';
import { AlertList, ModelContext, NoApiKey } from '@ailert/ui';

export const HomePage = () => {
  const theme = useTheme();
  const { model } = useContext(ModelContext);

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(1),
      }}
    >
      {model ? <AlertList /> : <NoApiKey />}
    </Container>
  );
};
