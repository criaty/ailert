import { Camera } from '@ailert/ui';
import { Container, useTheme } from '@mui/material';

export const HomePage = () => {
  const theme = useTheme();

  const onPicture = (image64: string) => {
    // console.log(image64);
    // TODO: Send to Gemini API
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
