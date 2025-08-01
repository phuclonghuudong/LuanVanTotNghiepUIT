import { Routes, Route } from "react-router-dom";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
  );
};

export default AuthRouter;
