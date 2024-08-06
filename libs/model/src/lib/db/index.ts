import { dataPoint } from '@blockium/firebase';
import { User } from '@ailert/model-types';

export const db = {
  users: () => dataPoint<User>(`users`),
};
