import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";

const MainLayout = () => {
  return (
    <main>
      <Header/>
      <Outlet />
      Footer
    </main>
  );
};

export default MainLayout;
