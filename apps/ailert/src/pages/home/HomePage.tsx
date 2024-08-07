import { useContext, useRef } from 'react';
import { Container, useTheme } from '@mui/material';
import { Camera, ModelContext, NoApiKey, useImageUpdate } from '@ailert/ui';

// TODO: 3. Add alert selector (as Cards) to choose the alert to trigger
// TODO: 5. Add ML model for text to speech (use transformers.js)
// TODO: Manage alerts (CRUD) with a form. Add a side menu

export const HomePage = () => {
  const theme = useTheme();
  const generatingRef = useRef(false);
  const { model } = useContext(ModelContext);
  const { onImageUpdate } = useImageUpdate();

  const onCapture = async (image64: string) => {
    if (generatingRef.current) return;
    generatingRef.current = true;
    const result = await onImageUpdate(image64);
    generatingRef.current = false;
    console.log(result?.response.text());
  };

  // TODO: Show message to configure the API key if not set yet

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(1),
      }}
    >
      {model ? <Camera onCapture={onCapture} /> : <NoApiKey />}
    </Container>
  );
};
