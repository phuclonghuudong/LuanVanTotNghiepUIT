import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const MainLayout = () => {
  return (
    <main className='w-full'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
