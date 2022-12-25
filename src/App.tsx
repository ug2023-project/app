import { MantineProvider } from '@mantine/core';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import Router from './router';
import { Outlet } from '@tanstack/react-location';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/translations/i18next';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Outlet />
        <ReactLocationDevtools initialIsOpen={false} position="bottom-right" />
      </Router>
    </MantineProvider>
  </I18nextProvider>
);

export default App;
