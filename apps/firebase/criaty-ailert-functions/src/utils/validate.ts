/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@ailert/model-types';
import { USER_ERROR_NON_UNIQUE_USER } from './user';
import { UserRecord } from 'firebase-admin/auth';

export const validateAuthEmail = (email: string, response: any) => {
  // Validate email
  if (!email) {
    response.status(412).send('Authenticated user without email.');
    return false;
  }

  return true;
};

export const validateName = (request: any, response: any) => {
  const { name } = request.body;

  // Validate person name
  if (!name || name.trim() === '') {
    response.status(400).send('Please enter your name.');
    return false;
  }

  return true;
};

export const validateUser = (user: string | User, response: any) => {
  if (typeof user === 'string') {
    if (user === USER_ERROR_NON_UNIQUE_USER) {
      response
        .status(412)
        .send(
          'More than one user was found in our records. Please contact support.',
        );
    } else {
      response.status(412).send('Invalid username. Please contact support.');
    }
    return false;
  } else {
    if (!user.id) {
      response.status(412).send('User has no ID. Please contact support.');
      return false;
    }
    return true;
  }
};

export const validateAuthId = (request: any, response: any) => {
  const { authId } = request.body;
  if (authId === undefined) {
    response.status(400).send('Authentication id is required.');
    return false;
  }
  return true;
};

export const validateAuthUser = async (
  authUser: UserRecord | null,
  response: any,
) => {
  if (!authUser) {
    response.status(412).send('Non-existent authentication account.');
    return false;
  }
  return true;
};
