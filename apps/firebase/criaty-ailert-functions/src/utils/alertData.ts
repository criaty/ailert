import { AlertData } from '@ailert/model-types';
import { db } from './db';

// Add alert to user's alerts collection
export const addAlertDataDB = async (userId: string, alertData: AlertData) => {
  const alertDataDoc = await db
    .alertData(userId)
    .add({ ...alertData, createdAt: new Date().toISOString() });
  return { id: alertDataDoc.id, ...alertData };
};

export const updateAlertDataDB = async (
  userId: string,
  alertId: string,
  alertData: AlertData,
) => {
  const alertRef = await db.alertData(userId).doc(alertId);
  await alertRef.set({ ...alertData, createdAt: new Date().toISOString() });
};
