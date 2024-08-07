import { useRef } from 'react';
import { Container, useTheme } from '@mui/material';
import { Camera, model, promptFromAlert } from '@ailert/ui';
import { CHILD_IN_DANGER_ALERT } from '@ailert/model-types';

// TODO: 2. Add the config to set the interval for the camera and Gemini API key
// TODO: 3. Add alert selector (as Cards) to choose the alert to trigger
// TODO: 5. Add ML model for text to speech (use transformers.js)
// TODO: Manage alerts (CRUD) with a form. Add a side menu

export const HomePage = () => {
  const theme = useTheme();
  const generatingRef = useRef(false);

  const onCaptured = async (image64: string) => {
    if (generatingRef.current) return;
    generatingRef.current = true;

    // console.log(image64);
    const prompt = promptFromAlert(CHILD_IN_DANGER_ALERT);
    const image = {
      inlineData: {
        data: image64.split(',')[1],
        mimeType: 'image/jpeg',
      },
    };

    const result = await model.generateContent([prompt, image]);
    generatingRef.current = false;
    console.log(result.response.text());
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(1),
      }}
    >
      <Camera onCaptured={onCaptured} />
    </Container>
  );
};
