import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import Router from './router';
import { Outlet } from '@tanstack/react-location';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/utils/translations/i18next';
import useColorScheme from '@/hooks/useColorScheme';

const App = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
};

export default App;
