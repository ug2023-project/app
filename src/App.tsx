import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import Router from './router';
import { Outlet } from '@tanstack/react-location';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/translations/i18next';
import useColorScheme from '@/hooks/useColorScheme';
import { Provider as ReduxProvider } from 'react-redux';
import makeStore from '@/redux/store';

const App = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={makeStore()}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Router>
              <Outlet />
              <ReactLocationDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </Router>
          </MantineProvider>
        </ColorSchemeProvider>
      </ReduxProvider>
    </I18nextProvider>
  );
};

export default App;
