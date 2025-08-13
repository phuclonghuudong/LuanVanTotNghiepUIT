import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ModalCartSidebar from "../../components/common/cart/ModalCartSidebar";
import MenuScreenMobile from "../../components/common/MenuScreenMobile";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <main className="w-full">
        <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
        <Outlet />
        <Footer />
      </main>
      {/* Modal Cart Sidebar */}
      <ModalCartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MenuScreenMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default MainLayout;
