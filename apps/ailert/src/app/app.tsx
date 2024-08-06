import { useTranslation } from 'react-i18next';

import { Home as HomeIcon } from '@mui/icons-material';
import { Settings as SettingsIcon } from '@mui/icons-material';

import { AppBase, AuthConfig } from '@blockium/appbase';
import { createPaletteConfig } from '@blockium/theme';
import { LayoutConfig } from '@blockium/layout';
import { IUser } from '@blockium/firebase';

import { AppLogo, isDefined } from '@ailert/ui';
import { User } from '@ailert/model-types';

// import { Signout } from './Signout';
import { HomePage } from '../pages';

export const App: React.FC = (props) => {
  // const [, setCurrentCustomer] = useCurrentCustomer();

  // 1. Configure Authentication
  const firebaseConfig = {
    apiKey: import.meta.env['VITE_FIREBASE_API_KEY'],
    authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'],
    projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'],
    storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
    appId: import.meta.env['VITE_FIREBASE_APP_ID'],
    measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENT_ID'],
  };
  const authConfig: AuthConfig = {
    config: firebaseConfig,
    loginMethods: ['google'],
    leftImage: '/images/login_768_1064.webp',
    topImage: '/images/login_1064_768.webp',
    afterEmailLoginApi: import.meta.env.VITE_AFTER_LOGIN_EMAIL_URL,
    onAfterLogin: async (user, loginParams) => {
      if (loginParams) {
        // If there is a param, you can define a custom behavior here:
        // Add a custom behavior here

        return false; // Prevents navigate to another page
      }

      return true;
    },
    onAfterAuthStateChanged: async (user: IUser) => {
      const customer = (await getUserDB(user.id)) as unknown as User;
      if (!isDefined(customer, t('model:error.no-customer'))) return false;
      // setCurrentCustomer(customer);

      return true;
    },
  };

  // 2. Configure the theme
  const themeConfig = { paletteConfig: createPaletteConfig('#329273') };

  // 3. Define the layout configuration
  const { t } = useTranslation();
  const layoutConfig: LayoutConfig = {
    logo: {
      light: <AppLogo />,
      dark: <AppLogo colorScheme="green-green-white-transparent" />,
      loading: (
        <AppLogo
          full={false}
          colorScheme="transparent-green-green-transparent"
          sx={{ marginTop: '0.75rem' }}
        />
      ),
    },
    topBar: {
      accountPopover: {
        accountMenu: [
          {
            label: t('account-menu.settings'),
            href: '/settings',
            icon: <SettingsIcon />,
          },
        ],
        // showColorSelector: false,
      },
    },
    sideBar: {
      sideMenu: [
        {
          label: t('side-menu.home'),
          href: '/',
          icon: <HomeIcon />,
        },
      ],
    },
  };

  // 4. Define the routes
  const routeElements = [{ path: '/', element: () => <HomePage /> }];

  return (
    <>
      <AppBase
        authConfig={authConfig}
        themeConfig={themeConfig}
        layoutConfig={layoutConfig}
        routeElements={routeElements}
      />
      {/* <Signout /> */}
    </>
  );
};

export default App;
function getUserDB(id: string): unknown {
  throw new Error('Function not implemented.');
}
