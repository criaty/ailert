import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import { Button, Stack } from '@mui/material';

import { ModelContext, useImageUpdate } from '../gemini';

// TODO: 4. Get front or back camera if any
// TODO: Adjust camera width and height to the screen size
// TODO: Test with different qualities

type CameraProps = {
  width?: number;
  height?: number;
};

const DEFAULT_INTERVAL = 4000; // 4 seconds
const DEFAULT_QUALITY = 0.5;

export const Camera: React.FC<CameraProps> = ({
  width = 320,
  height = 240,
}) => {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<unknown | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const generatingRef = useRef(false);
  const { onImageUpdate } = useImageUpdate();
  const { updateInterval } = useContext(ModelContext);

  const onCapture = useCallback(
    async (image64: string) => {
      if (generatingRef.current) return;
      generatingRef.current = true;
      try {
        const result = await onImageUpdate(image64);
        console.log(result?.response.text());
        //
      } catch (error) {
        console.error(error);
        stopCapture();
        enqueueSnackbar(t('ui:error.onImageUpdate'), { variant: 'error' });
        //
      } finally {
        generatingRef.current = false;
      }
    },
    [onImageUpdate, t],
  );

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas
      .getContext('2d')
      ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image64 = canvas.toDataURL('image/jpeg', DEFAULT_QUALITY);
    onCapture(image64);
  }, [height, width, onCapture]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (!videoRef.current) return;
        const video = videoRef.current;
        video.srcObject = stream;
        // video.play();
      });

    return () => stopCapture();
    //
  }, [updateInterval]);

  const startCapture = () => {
    setStarted(true);
    intervalRef.current = setInterval(
      () => {
        captureImage();
      },
      updateInterval ? updateInterval * 1000 : DEFAULT_INTERVAL,
    );
  };

  const stopCapture = () => {
    setStarted(false);
    intervalRef.current && clearInterval(intervalRef.current as number);
  };

  return (
    <Stack width="100%" gap={2} alignItems="center">
      <video
        ref={videoRef}
        id="video"
        width={width}
        height={height}
        autoPlay
      ></video>
      {!started && (
        <Button variant="contained" onClick={startCapture}>
          {t('ui:button.start')}
        </Button>
      )}
      {started && (
        <Button variant="contained" onClick={stopCapture}>
          {t('ui:button.stop')}
        </Button>
      )}
    </Stack>
  );
};
