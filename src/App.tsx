import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/translations/i18next';
import useColorScheme from '@/hooks/useColorScheme';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import '@/utils/axios/axiosConfig';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import AuthProvider from './router/AuthProvider';

import styles from './App.module.css';
import { Notifications } from '@mantine/notifications';
import router from '@/router/index';

const persistor = persistStore(store);

const App = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Suspense fallback={<div className={styles.loader}></div>}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <AuthProvider>
              <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              >
                <MantineProvider
                  withCSSVariables
                  withNormalizeCSS
                  theme={{ colorScheme }}
                >
                  <Notifications />
                  <RouterProvider router={router} />
                </MantineProvider>
              </ColorSchemeProvider>
            </AuthProvider>
          </PersistGate>
        </ReduxProvider>
      </I18nextProvider>
    </Suspense>
  );
};

export default App;
