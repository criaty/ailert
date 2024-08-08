import { useContext } from 'react';
import { Container, useTheme } from '@mui/material';
import { AlertList, ModelContext, NoApiKey } from '@ailert/ui';

// TODO: 5. Add ML model for text to speech (use transformers.js)
// TODO: Manage alerts (CRUD) with a form. Add a side menu

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
