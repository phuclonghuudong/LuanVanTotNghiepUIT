import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ModalCartSidebar from "../../components/common/cart/ModalCartSidebar";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <main className='w-full'>
        <Header onCartClick={() => setIsCartOpen(true)} />
        <Outlet />
        <Footer />
      </main>
      {/* Modal Cart Sidebar */}
      <ModalCartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default MainLayout;
