import { Router as ReactLocationRouter } from '@tanstack/react-location';
import { routes, location } from './routes';

const Router = ({ children }: RouterProps) => (
  <ReactLocationRouter
    routes={routes}
    location={location}
    defaultPendingMinMs={500}
    defaultPendingMs={2000}
  >
    {children}
  </ReactLocationRouter>
);

type RouterProps = {
  children: React.ReactNode;
};

export default Router;
