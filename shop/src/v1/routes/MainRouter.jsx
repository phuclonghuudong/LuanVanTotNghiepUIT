import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/pages/HomeScreen";
import MainLayout from "../screens/pages/MainLayout";
import ProductPage from "../screens/pages/products/ProductPage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path='/products' element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
