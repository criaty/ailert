import { DocumentData } from 'firebase-admin/firestore';
import admin from './admin';
import { Alert, AlertData, User } from '@ailert/model-types';

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const dataPoint = <T extends DocumentData>(collectionPath: string) =>
  admin.firestore().collection(collectionPath).withConverter(converter<T>());

const db = {
  users: dataPoint<User>('users'),
  alerts: (userId: string) => dataPoint<Alert>(`users/${userId}/alerts`),
  alertData: (userId: string) =>
    dataPoint<AlertData>(`users/${userId}/alertData`),
};
export { db };
