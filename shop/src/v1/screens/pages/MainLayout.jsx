import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ModalCartSidebar from "../../components/common/cart/ModalCartSidebar";
import MenuScreenMobile from "../../components/common/MenuScreenMobile";
import LoadingPage from "../../components/common/LoadingPage";
import {store} from "./../../stores/store";
import {Provider} from "react-redux";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Sau 2 giây thì set loading = false
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Dọn dẹp khi component bị unmount
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <LoadingPage text="Đang tải thông tin..." />;
  return (
    <Provider store={store}>
      <main className="w-full">
        <Header onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
        <Outlet />
        <Footer />
      </main>
      {/* Modal Cart Sidebar */}
      <ModalCartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MenuScreenMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Provider>
  );
};

export default MainLayout;
