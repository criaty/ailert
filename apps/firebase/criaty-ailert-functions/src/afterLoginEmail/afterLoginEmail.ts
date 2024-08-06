import { onRequest } from 'firebase-functions/v2/https';
import { UserRecord } from 'firebase-admin/auth';

import { User } from '@ailert/model-types';

import { getAuthUser, getOrCreateUserByAuthId, updateUser } from '../utils';
import {
  validateAuthEmail,
  validateAuthId,
  validateAuthUser,
  validateUser,
} from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateParams = (request: any, response: any) => {
  return validateAuthId(request, response);
};

export const afterLoginEmail = onRequest(
  // concurrency: 80 is default
  // { cors: [/criaty\.com$/], concurrency: 80 },
  { cors: true, concurrency: 80 },
  async (request, response) => {
    if (!validateParams(request, response)) return;

    try {
      // Get Firebase authenticated user data filtered by authId
      const authUser = (await getAuthUser(request.body.authId)) as UserRecord;
      if (!validateAuthUser(authUser, response)) return;

      // Validates the user if it has an email
      if (!validateAuthEmail(authUser.email as string, response)) return;

      // Get a user data filtered by phone, creating if it doesn't exist
      const userName =
        authUser.displayName ||
        authUser.email ||
        authUser.phoneNumber ||
        'No name';
      const user = (await getOrCreateUserByAuthId(
        authUser.uid,
        userName,
        authUser.displayName,
        authUser.email,
        authUser.phoneNumber?.replace(/\D/g, ''),
      )) as User;
      if (!validateUser(user, response)) return;

      // Update app user's auth id in Firestore
      await updateUser(user.id, {
        authId: authUser.uid,
        // Used to create the field to search:
        searchName: userName.toLowerCase(), // TODO: Can be removed in future.
      });

      const { id: userId, name, displayName, email, phone } = user;
      response
        .status(200)
        .send(JSON.stringify({ userId, name, displayName, email, phone }));
    } catch (error) {
      console.log(error);
      response.status(424).send('Houve um erro ao realizar o after login.');
    }
  },
);
