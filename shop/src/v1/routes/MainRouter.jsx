import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "../screens/pages/HomeScreen";
import MainLayout from "../screens/pages/MainLayout";
import ProductPage from "../screens/pages/products/ProductPage";
import AuthRouter from "./AuthRouter";
import ProductDetail from "../screens/pages/products/ProductDetail";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/detail-1" element={<ProductDetail />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
