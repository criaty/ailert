import { useEffect, useRef } from 'react';
import { Button, Stack } from '@mui/material';

type CameraProps = {
  width?: number;
  height?: number;
  onPicture?: (image64: string) => void;
};

export const Camera: React.FC<CameraProps> = ({
  width = 320,
  height = 240,
  onPicture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (!videoRef.current) return;
        const video = videoRef.current;
        video.srcObject = stream;
        // video.play();
      });
  }, []);

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas
      .getContext('2d')
      ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const image64 = canvas.toDataURL('image/jpeg', 0.5);
    onPicture?.(image64);
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
      <Button variant="contained" onClick={captureImage}>
        Take Photo
      </Button>
    </Stack>
  );
};
