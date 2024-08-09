import { AlertData } from '@ailert/model-types';
import { db } from './db';

// Add alert to user's alerts collection
export const addAlertDB = async (userId: string, alertData: AlertData) => {
  const alertDoc = await db
    .alerts(userId)
    .add({ ...alertData, createdAt: new Date().toISOString() });
  return { id: alertDoc.id, ...alertData };
};

export const updateAlertDB = async (
  userId: string,
  alertId: string,
  alertData: AlertData,
) => {
  const alertRef = await db.alerts(userId).doc(alertId);
  await alertRef.set({ ...alertData, createdAt: new Date().toISOString() });
};
