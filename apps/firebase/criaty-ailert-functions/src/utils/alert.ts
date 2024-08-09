import { Alert } from '@ailert/model-types';
import { db } from './db';
import { deleteDoc, doc } from 'firebase/firestore';

// Add alert to user's alerts collection
export const addAlertDB = async (userId: string, alert: Alert) => {
  const newAlert = { ...alert, createdAt: new Date().toISOString() };
  const alertDoc = await db.alerts(userId).add(newAlert);
  return { id: alertDoc.id, ...newAlert };
};

export const updateAlertDB = async (
  userId: string,
  alertId: string,
  alert: Alert,
) => {
  const alertRef = await db.alerts(userId).doc(alertId);
  await alertRef.set({ ...alert });
};

export const deleteAlertDB = async (userId: string, alert: Alert) => {
  const col = db.alerts(userId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const alertRef = doc(col as any, alert.id);
  await deleteDoc(alertRef);
  return true;
};
