import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/pages/HomeScreen";
import MainLayout from "../screens/pages/MainLayout";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route  index element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
