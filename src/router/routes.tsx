import HomePage from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import { ReactLocation, Route } from '@tanstack/react-location';

export const location = new ReactLocation();

export const routes: Route[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
];
