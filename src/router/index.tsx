import Home from '@/containers/Dashboard';
import BookmarkList from '@/containers/Dashboard/BookmarkList';
import BookmarkError from '@/containers/Dashboard/BookmarkList/BookmarkError';
import bookmarkLoader from '@/containers/Dashboard/BookmarkList/bookmarkLoader';
import CollectionList from '@/containers/Dashboard/CollectionList';
import SearchBar from '@/containers/Dashboard/SearchBar';
import MainLayout from '@/layouts/MainLayout';
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

const routes = createRoutesFromElements(
  // main to implement later
  <Route path="/" element={<Outlet />}>
    <Route index element={<Home />} />
    <Route
      path="collections"
      element={
        <MainLayout
          asideContent={<CollectionList />}
          searchBarContent={<SearchBar />}
        />
      }
    >
      <Route
        index
        element={<Navigate to="5" />}
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
