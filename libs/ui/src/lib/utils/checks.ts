import { enqueueSnackbar } from 'notistack';

export const isDefined = (obj: unknown, msg?: string) => {
  if (obj) return true;
  if (msg) enqueueSnackbar(msg, { variant: 'error' });
  return false;
};

export const isTrue = (check: boolean, msg?: string) => {
  if (check) return true;
  if (msg) enqueueSnackbar(msg, { variant: 'error' });
  return false;
};
