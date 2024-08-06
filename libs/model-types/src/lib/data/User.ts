export type User = {
  id: string;
  name: string;
  displayName: string;
  searchName: string;
  phone?: string;
  email?: string;
  authId?: string;
};

export const DEFAULT_USER: User = {
  id: '',
  name: '',
  displayName: '',
  searchName: '',
};