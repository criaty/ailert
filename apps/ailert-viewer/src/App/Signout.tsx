import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from '@blockium/firebase';

// This component just adds an auth change listener in order to clear cache
// As it has a hook, it avoids rerendering on main App component
export const Signout = () => {
  useEffect(() => {
    return onAuthStateChanged(getAuth(), async (firebaseUser) => {
      if (!firebaseUser) {
        // Clear cache 
      }
    });
  }, []);

  return null;
};
