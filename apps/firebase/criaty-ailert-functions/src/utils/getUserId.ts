import { HttpsError } from 'firebase-functions/v2/https';
import { getAllUsersByAuthIdDB } from './user';

type AuthData = {
  uid: string;
};

export const getUserId = async (auth?: AuthData) => {
  // Checking that the user is authenticated.
  if (!auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError(
      'failed-precondition',
      'The function must be ' + 'called while authenticated.',
    );
  }

  const uid = auth.uid;
  const users = await getAllUsersByAuthIdDB(uid);
  // Checking if one user was found
  if (users.length !== 1) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError(
      'failed-precondition',
      'The user must exist and be unique.',
    );
  }
  const userId = users[0].id;

  return userId;
};
