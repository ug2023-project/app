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
} from 'react-router-dom';

const routes = createRoutesFromElements(
  // main to implement later
  <Route path="/" element={<Outlet />}>
    <Route index element={<Outlet />} />
    <Route
      path="dashboard"
      element={
        <MainLayout
          asideContent={<CollectionList />}
          searchBarContent={<SearchBar />}
        />
      }
    >
      <Route
        index
        element={<BookmarkList />}
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
