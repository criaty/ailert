import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AlertData, AlertRisk } from '@ailert/model-types';

type AlertDataCardProps = {
  alertData: AlertData;
  maxHeight?: number | string | object;
  onClick?: VoidFunction;
};

export const AlertDataCard: React.FC<AlertDataCardProps> = ({
  alertData,
  maxHeight = 380,
  onClick,
}) => {
  const { title, risk, message, image64 } = alertData;

  return (
    <motion.div
      whileHover={{ opacity: 0.8, scale: 1.05 }}
      transition={{ ease: 'easeIn' }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Card
        sx={{
          height: '100%',
          maxHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor:
            risk === AlertRisk.MEDIUM
              ? '#fde047'
              : AlertRisk.HIGH
                ? '#f87171'
                : 'inherit',
        }}
      >
        <CardMedia
          component="img"
          height="200px"
          image={`data:image/png;base64,${image64}`}
          alt={title}
        />
        <CardContent sx={{ height: '180px' }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Box height="100%" overflow="auto">
            <Typography variant="body2" color="text.primary">
              {message}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
