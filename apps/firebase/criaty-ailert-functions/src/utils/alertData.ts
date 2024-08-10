import { AlertData } from '@ailert/model-types';
import { db } from './db';

export const getAlertDataDB = async (userId: string) => {
  const q = db.alertData(userId).orderBy('createdAt', 'desc').limit(50);
  const querySnapshot = await q.get();
  const alertData = querySnapshot.docs.map((doc) => {
    const alertData: AlertData = {
      ...(doc.data() as AlertData),
      id: doc.id,
    };
    return alertData;
  });
  return alertData;
};

export const addAlertDataDB = async (userId: string, alertData: AlertData) => {
  const newAlertData = { ...alertData, createdAt: new Date().toISOString() };
  const alertDataDoc = await db.alertData(userId).add(newAlertData);
  return { id: alertDataDoc.id, ...newAlertData } as AlertData;
};

export const updateAlertDataDB = async (
  userId: string,
  alertId: string,
  alertData: AlertData,
) => {
  const alertRef = await db.alertData(userId).doc(alertId);
  await alertRef.set({ ...alertData });
};
