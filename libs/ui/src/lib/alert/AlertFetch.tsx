import { PropsWithChildren, useEffect } from 'react';
import { useGetAlerts } from './useGetAlerts';

export const AlertFetch: React.FC<PropsWithChildren> = ({ children }) => {
  const { getAlerts } = useGetAlerts();

  useEffect(() => {
    // Get user defined alerts.
    getAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
