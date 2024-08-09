import admin from './admin';
import { UserRecord } from 'firebase-admin/auth';

import { User } from '@ailert/model-types';
import { db } from './db';

export const USER_ERROR_NON_UNIQUE_USER = 'USER_ERROR_NON_UNIQUE_USER';
export const USER_ERROR_NOT_FOUND = 'USER_ERROR_NOT_FOUND';

// Save user's data (name, phone, email) in Firestore at users collection
export const createUserDB = async (
  name: string,
  displayName?: string,
  phone?: string,
  email?: string,
) => {
  // Use unknown type to drop id field and add searchName field
  const user: unknown = {
    name,
    displayName: displayName || name,
    searchName: name.toLowerCase(),
    phone,
    email,
  };
  const userDoc = await db.users.add(user as User);
  (user as User).id = userDoc.id;
  return user as User;
};

// Get a user data by userId
export const getUserDB = async (userId: string) => {
  const userRef = await db.users.doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    return USER_ERROR_NOT_FOUND;
  }

  const user = userDoc.data() as User;
  user.id = userDoc.id;

  return user;
};

export const getAllUsersByAuthIdDB = async (authId: string) => {
  const userQuery = await db.users.where('authId', '==', authId).get();
  return userQuery.docs.map((userDoc) => {
    return { ...(userDoc.data() as User), id: userDoc.id };
  });
};

// Get a user data filtered by authId, creating if it doesn't exist
export const getOrCreateUserDB = async (
  authId: string,
  name: string,
  displayName?: string,
  phone?: string,
  email?: string,
) => {
  const users = await getAllUsersByAuthIdDB(authId);

  switch (users.length) {
    case 0:
      return await createUserDB(name, displayName || name, phone, email);

    case 1:
      await updateUserDB(users[0].id, { name, displayName, phone, email });
      return users[0];

    default:
      return USER_ERROR_NON_UNIQUE_USER;
  }
};

// Get a user data filtered by email, creating if it doesn't exist
export const getOrCreateUserByAuthIdDB = async (
  authId: string,
  name: string,
  displayName?: string,
  email?: string,
  phone?: string,
) => {
  const users = await getAllUsersByAuthIdDB(authId);

  switch (users.length) {
    case 0:
      return await createUserDB(name, displayName || name, phone, email);

    case 1:
      if (
        users[0].name !== name ||
        users[0].displayName !== displayName ||
        users[0].email !== email ||
        users[0].phone !== phone
      ) {
        // Update user
        await updateUserDB(users[0].id, { name, displayName, phone, email });
        users[0].name = name;
      }

      return users[0];
    //
    default:
      return USER_ERROR_NON_UNIQUE_USER;
  }
};

export const updateUserDB = async (userId: string, dataToUpdate: object) => {
  const userRef = db.users.doc(userId);
  await userRef.update(dataToUpdate);
};

// Get Firebase authenticated user data filtered by authId
export const getAuthUser = async (authId: string) => {
  try {
    return await admin.auth().getUser(authId);
  } catch (error) {
    // console.log(error);
    return null;
  }
};

// Check if Firebase user is anonymous
export const isAnonymousUser = (authUser: UserRecord) => {
  return (
    authUser.providerData.length === 0 ||
    (authUser.providerData.length === 1 &&
      authUser.providerData[0].providerId === 'anonymous')
  );
};
