import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { getFunctions } from '@blockium/firebase';
import { httpsCallable } from 'firebase/functions';

import { ModelContext, useImageUpdate } from '../gemini';
import { AlertContext } from '../alert';
import { AlertData, AlertRisk } from '@ailert/model-types';

type CameraProps = {
  width?: number;
  height?: number;
};

export const Camera: React.FC<CameraProps> = ({
  width = import.meta.env.VITE_DEFAULT_IMAGE_WIDTH,
  height = import.meta.env.VITE_DEFAULT_IMAGE_HEIGHT,
}) => {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<unknown | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const generatingRef = useRef(false);
  const { onImageUpdate } = useImageUpdate();
  const { updateInterval } = useContext(ModelContext);
  const { alert } = useContext(AlertContext);

  const onCapture = useCallback(
    async (image64: string) => {
      if (generatingRef.current) return;
      generatingRef.current = true;
      try {
        const result = await onImageUpdate(image64);
        const responseText = result?.response.text();
        if (!responseText) return;
        console.log(responseText);

        const alertData = JSON.parse(responseText) as AlertData;
        // Do not add low risk alerts to the database
        if (alertData.risk === AlertRisk.LOW) return;

        const addAlertData = httpsCallable(getFunctions(), 'addAlertData');
        try {
          await addAlertData({ ...alertData, title: alert.title, image64 });

          // If webhook call the webhook with the image64 and the alert data
          if (alert.webhookUrl) {
            const response = await fetch(alert.webhookUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                key: alert.webhookKey,
                ...alertData,
                image64,
              }),
            });
            console.log('webhook response', response);
          }
          //
        } catch (error) {
          console.log(error);
          enqueueSnackbar(t('ui:error.onAlertDataAdd'), { variant: 'error' });
        }

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
    [alert, onImageUpdate, t],
  );

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas
      .getContext('2d')
      ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image64 = canvas.toDataURL(
      'image/jpeg',
      import.meta.env.VITE_DEFAULT_IMAGE_QUALITY,
    );
    onCapture(image64.split(',')[1]);
  }, [height, width, onCapture]);

  const [currCamera, setCurrCamera] = useState('');
  const [cameras, setCameras] = useState<{ camId: string; camName: string }[]>(
    [],
  );
  useEffect(() => {
    let count = 1;
    const cameras: { camId: string; camName: string }[] = [];
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      for (const mediaDevice of mediaDevices) {
        if (mediaDevice.kind === 'videoinput') {
          let camName = mediaDevice.label || `Camera ${count++}`;
          // Remove (..) at end of the camName
          const match = camName.match(/\((.*)\)/);
          if (match) {
            camName = camName.replace(match[0], '').trim();
          }
          cameras.push({ camId: mediaDevice.deviceId, camName });
        }
      }
      setCameras(cameras);
      cameras.length > 0 && setCurrCamera(cameras[0].camId);
    });
  }, []);

  function stopMediaTracks(stream: MediaStream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  useEffect(() => {
    if (videoRef.current?.srcObject) {
      stopMediaTracks(videoRef.current?.srcObject as MediaStream);
    }

    const videoConstraints: {
      facingMode?: string;
      deviceId?: { exact: string };
    } = {};
    if (!currCamera) {
      videoConstraints.facingMode = 'environment';
    } else {
      videoConstraints.deviceId = { exact: currCamera };
    }
    const constraints = {
      video: videoConstraints,
      audio: false,
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
    });

    return () => stopCapture();
    //
  }, [currCamera, updateInterval]);

  const startCapture = () => {
    setStarted(true);
    intervalRef.current = setInterval(
      () => {
        captureImage();
      },
      updateInterval
        ? updateInterval * 1000
        : import.meta.env.VITE_DEFAULT_INTERVAL,
    );
  };

  const stopCapture = () => {
    setStarted(false);
    intervalRef.current && clearInterval(intervalRef.current as number);
  };

  return (
    <Stack width="100%" gap={2} alignItems="center">
      <Typography gutterBottom variant="h5" component="div">
        {alert.title}
      </Typography>
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel id="label-camera" required>
          {t('ui:label.camera')}
        </InputLabel>
        <Select
          labelId="label-camera"
          id="camera"
          value={currCamera}
          label={t('ui:label.camera')}
          onChange={(e) => setCurrCamera(e.target.value)}
        >
          {cameras.map((cam) => (
            <MenuItem key={cam.camId} value={cam.camId}>
              {cam.camName}
            </MenuItem>
          ))}
          <MenuItem value="drone">Drone Cam</MenuItem>
          <MenuItem value="wifi">WiFi Cam 1</MenuItem>
        </Select>
      </FormControl>
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
