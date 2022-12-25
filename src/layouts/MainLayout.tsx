import MainNavbar from '../components/Navbars/MainNavbar';

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <MainNavbar />
    {children}
  </>
);

type MainLayoutProps = {
  children: React.ReactNode;
};

export default MainLayout;
