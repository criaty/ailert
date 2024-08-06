import {
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';

import { User } from '@ailert/model-types';
import { db } from '../db';

import { removeNullishFields } from '@blockium/utils';

export const getUserDB = async (userId: string) => {
  try {
    const docRef = doc(db.users(), userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
  } catch (e) {
    console.error('Error getting user: ', e);
    return false;
  }
};

export const getUsersByNameDB = async (
  partialName: string,
  partnerEmail: string,
) => {
  try {
    const q = query(
      db.users(),
      where('searchName', '>=', partialName.toLowerCase()),
      where('searchName', '<=', partialName.toLowerCase() + '\uf8ff'),
      where('partners', 'array-contains', partnerEmail),
    );
    const querySnapshot = await getDocs(q);
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    return users;
  } catch (e) {
    console.error('Error getting users: ', e);
    return false;
  }
};

export const changeUserDB = async (user: User) => {
  try {
    if (user.id) {
      const col = db.users();
      const docRef = doc(col, user.id);
      const data = removeNullishFields(user);
      await updateDoc(docRef, { ...data, id: deleteField() });
      return data;
    }
    return false;
  } catch (e) {
    console.error('Error updating user: ', e);
    return false;
  }
};
