import { AlertData } from '@ailert/model-types';
import { db } from './db';

// Add alert to user's alerts collection
export const addAlertDB = async (alertData: AlertData, userId: string) => {
  const alertDoc = await db.alerts(userId).add(alertData);
  return { id: alertDoc.id, ...alertData };
};
