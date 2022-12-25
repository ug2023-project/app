import { MantineProvider } from '@mantine/core';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import Router from './router';
import { Outlet } from '@tanstack/react-location';

const App = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Router>
      <Outlet />
      <ReactLocationDevtools initialIsOpen={false} position="bottom-right" />
    </Router>
  </MantineProvider>
);

export default App;
