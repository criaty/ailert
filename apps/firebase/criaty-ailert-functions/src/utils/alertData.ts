import { AlertData } from '@ailert/model-types';
import { db } from './db';
import { getDocs, orderBy, query, where } from 'firebase/firestore';

export const getAlertDataDB = async (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  const q = query(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db.alertData(userId) as any,
    orderBy('createdAt', 'asc'),
    where('createdAt', '>=', startDate),
    where('createdAt', '<=', endDate),
  );
  const querySnapshot = await getDocs(q);
  return await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const alertData: AlertData = {
        ...(doc.data() as AlertData),
        id: doc.id,
      };
      return alertData;
    }),
  );
};

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
