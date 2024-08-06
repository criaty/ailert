import { createGlobalState } from 'react-use';
import { DEFAULT_USER, User } from '@ailert/model-types';

export const useCurrentCustomer = createGlobalState<User>(DEFAULT_USER);
