import Login from '@/containers/Account/Login';
import Register from '@/containers/Account/Register';
import Home from '@/containers/Dashboard';
import BookmarkList from '@/containers/Dashboard/BookmarkList';
import BookmarkError from '@/containers/Dashboard/BookmarkList/BookmarkError';
import bookmarkLoader from '@/containers/Dashboard/BookmarkList/bookmarkLoader';
import CollectionList from '@/containers/Dashboard/CollectionList';
import SearchBar from '@/containers/Dashboard/SearchBar';
import FormLayout from '@/layouts/AccountLayouts/FormLayout';
import MainLayout from '@/layouts/MainLayout';
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const routes = createRoutesFromElements(
  // main to implement later
  <Route path="/" element={<Outlet />}>
    <Route index element={<Home />} />
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
        element={<Navigate to="5" />}
        loader={bookmarkLoader}
        errorElement={<BookmarkError />}
      />

      <Route
        path=":collectionId"
        element={<BookmarkList />}
        loader={bookmarkLoader}
        errorElement={<BookmarkError />}
      />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);

export default router;
