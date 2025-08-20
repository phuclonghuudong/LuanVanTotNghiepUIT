import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ModalCartSidebar from "../../components/common/cart/ModalCartSidebar";
import MenuScreenMobile from "../../components/common/MenuScreenMobile";
import { getProfile } from "../../apis/userApi";
import LoadingPage from "../../components/common/LoadingPage";

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200); // 1.2s
    let mounted = true;
    (async () => {
      try {
        const res = await getProfile();
        // tuỳ backend: DATA hoặc data
        const u = res.data?.DATA.USER ?? res.data.user;
        if (mounted) setUser(u);
      } catch {
        // interceptor 401 đã xử lý chuyển về /login
      }
    })();
    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, []);

  if (loading) return <LoadingPage text="Đang tải thông tin..." />;
  return (
    <>
      <main className="w-full">
        <Header user={user} onCartClick={() => setIsCartOpen(true)} onMenuClick={() => setIsMenuOpen(true)} />
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
