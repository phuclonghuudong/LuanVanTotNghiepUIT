import { Routes, Route } from "react-router-dom";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import MyAccount from "../screens/pages/account/MyAccount";
import MyAddress from "../screens/pages/account/MyAddress";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-profile" element={<MyAccount />} />
      <Route path="/account-address" element={<MyAddress />} />
    </Routes>
  );
};

export default AuthRouter;
