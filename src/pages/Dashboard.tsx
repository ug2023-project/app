import DashboardLayout from '@/layouts/DashboardLayout';
import CollectionList from '@/containers/Dashboard/CollectionList';
import BookmarkList from '@/containers/Dashboard/BookmarkList';
import SearchBar from '@/containers/Dashboard/SearchBar';

const Dashboard = () => (
  <DashboardLayout
    asideContent={<CollectionList />}
    mainContent={<BookmarkList />}
    searchBarContent={<SearchBar />}
  />
);

export default Dashboard;
