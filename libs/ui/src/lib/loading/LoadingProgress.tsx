import { Box, alpha } from '@mui/material';
import { LoadingIndicator } from '@blockium/ui';
import { AppLogo } from '../logo';

type LoadingProgressProps = {
  loading: boolean;
  fullScreen?: boolean;
};

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
  loading,
  fullScreen,
}) => {
  return (
    loading && (
      <Box
        position={fullScreen ? 'fixed' : 'absolute'}
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={(theme) => alpha(theme.palette.background.paper, 0.8)}
        zIndex={100}
      >
        <LoadingIndicator>
          <AppLogo
            full={false}
            colorScheme="transparent-green-green-transparent"
            sx={{ marginTop: '0.75rem' }}
          />
        </LoadingIndicator>
      </Box>
    )
  );
};
