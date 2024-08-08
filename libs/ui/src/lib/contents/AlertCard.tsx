import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type AlertCardProps = {
  title: string;
  description: string;
  maxHeight?: number | string | object;
};

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  maxHeight = 320,
}) => {
  return (
    <motion.div
      whileHover={{ opacity: 0.8, scale: 1.02 }}
      transition={{ ease: 'easeIn' }}
      style={{ cursor: 'pointer' }}
    >
      <Card
        sx={{
          height: '100%',
          maxHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};
