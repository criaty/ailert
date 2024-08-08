import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type AlertCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  maxHeight?: number | string | object;
  onClick?: VoidFunction;
};

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  imageUrl,
  maxHeight = 400,
  onClick,
}) => {
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
        }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={imageUrl}
            alt={title}
          />
        )}
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
