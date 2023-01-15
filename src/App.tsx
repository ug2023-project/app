import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/translations/i18next';
import useColorScheme from '@/hooks/useColorScheme';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import '@/utils/axios/axiosConfig';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import {
  DndProvider,
  getBackendOptions,
  MultiBackend,
} from '@minoru/react-dnd-treeview';
import AuthProvider from './router/AuthProvider';

import styles from './App.module.css';

const persistor = persistStore(store);

const App = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Suspense fallback={<div className={styles.loader}></div>}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
                <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              >
                <MantineProvider
                  withCSSVariables
                  withGlobalStyles
                  withNormalizeCSS
                  theme={{ colorScheme }}
                >
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
