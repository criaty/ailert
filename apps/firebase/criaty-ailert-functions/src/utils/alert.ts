import { Alert } from '@ailert/model-types';
import { db } from './db';

export const getAlertsDB = async (userId: string) => {
  const q = db.alerts(userId).orderBy('createdAt', 'desc');
  const querySnapshot = await q.get();
  const alerts = querySnapshot.docs.map((doc) => {
    const alert: Alert = {
      ...(doc.data() as Alert),
      id: doc.id,
    };
    return alert;
  });
  return alerts;
};

export const addAlertDB = async (userId: string, alert: Alert) => {
  const newAlert = { ...alert, createdAt: new Date().toISOString() };
  const alertDoc = await db.alerts(userId).add(newAlert);
  return { id: alertDoc.id, ...newAlert } as Alert;
};

export const updateAlertDB = async (
  userId: string,
  alertId: string,
  alert: Alert,
) => {
  const alertRef = await db.alerts(userId).doc(alertId);
  await alertRef.set({ ...alert });
};

export const deleteAlertDB = async (userId: string, alertId: string) => {
  db.alerts(userId).doc(alertId).delete();
  return true;
};
