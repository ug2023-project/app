import Login from '@/containers/Account/Login';
import Register from '@/containers/Account/Register';
import BookmarkList from '@/containers/Dashboard/BookmarkList';
import BookmarkError from '@/containers/Dashboard/BookmarkList/BookmarkError';
import CollectionList from '@/containers/Dashboard/CollectionList';
import SearchBar from '@/containers/Dashboard/SearchBar';
import FormLayout from '@/containers/Account/Common';
import MainLayout from '@/layouts/MainLayout';
import {
  Outlet,
  Route,
  createRoutesFromElements,
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const routes = createRoutesFromElements(
  <Route path="/" element={<Outlet />}>
    <Route index element={<Navigate to="collections" />} />
    <Route
      path="login"
      element={
        <FormLayout>
          <Login />
        </FormLayout>
      }
    />
    <Route
      path="register"
      element={
        <FormLayout>
          <Register />
        </FormLayout>
      }
    />
    <Route
      path="collections"
      element={
        <PrivateRoute>
          <MainLayout
            asideContent={<CollectionList />}
            searchBarContent={<SearchBar />}
          />
        </PrivateRoute>
      }
    >
      <Route
        index
        element={<Navigate to="all" />}
        errorElement={<BookmarkError />}
      />

      <Route
        path=":collectionId"
        element={<BookmarkList />}
        errorElement={<BookmarkError />}
      />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);

export default router;
