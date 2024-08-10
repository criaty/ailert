import { PropsWithChildren, useEffect } from 'react';
import { useGetAlerts } from './useGetAlerts';
import { useCurrentCustomer } from '../hooks';

export const AlertFetch: React.FC<PropsWithChildren> = ({ children }) => {
  const [customer] = useCurrentCustomer();
  const { getAlerts } = useGetAlerts();

  // Get user defined alerts once.
  useEffect(() => {
    if (!customer?.id) return;
    getAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  return children;
};
