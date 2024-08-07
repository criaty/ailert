import { CHILD_IN_DANGER_ALERT } from '@ailert/model-types';
import { Camera, model, promptFromAlert } from '@ailert/ui';
import { Container, useTheme } from '@mui/material';

export const HomePage = () => {
  const theme = useTheme();

  const onPicture = async (image64: string) => {
    // console.log(image64);
    const prompt = promptFromAlert(CHILD_IN_DANGER_ALERT);
    const image = {
      inlineData: {
        data: image64.split(',')[1],
        mimeType: 'image/jpeg',
      },
    };

    const result = await model.generateContent([prompt, image]);
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
      <Camera onPicture={onPicture} />
    </Container>
  );
};
