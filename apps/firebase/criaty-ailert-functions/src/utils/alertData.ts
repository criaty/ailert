import { AlertData } from '@ailert/model-types';
import { db } from './db';

// Add alert to user's alerts collection
export const addAlertDataDB = async (userId: string, alertData: AlertData) => {
  const newAlertData = { ...alertData, createdAt: new Date().toISOString() };
  const alertDataDoc = await db.alertData(userId).add(newAlertData);
  return { id: alertDataDoc.id, ...newAlertData };
};

export const updateAlertDataDB = async (
  userId: string,
  alertId: string,
  alertData: AlertData,
) => {
  const alertRef = await db.alertData(userId).doc(alertId);
  await alertRef.set({ ...alertData });
};
