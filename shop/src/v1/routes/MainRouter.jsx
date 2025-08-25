import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "../screens/pages/HomeScreen";
import MainLayout from "../screens/pages/MainLayout";
import ProductPage from "../screens/pages/products/ProductPage";
import AuthRouter from "./AuthRouter";
import ProductDetail from "../screens/pages/products/ProductDetail";
import Cart from "../screens/pages/cart/Cart";
import PlaceOrder from "../screens/pages/order/PlaceOrder";
import Orders from "../screens/pages/order/Orders";
import Blog from "../screens/pages/blog/Blog";
import Contact from "../screens/pages/contact/Contact";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/detail-1" element={<ProductDetail />} />
        <Route path="/collection" element={<AuthRouter />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/about" element={<AuthRouter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
