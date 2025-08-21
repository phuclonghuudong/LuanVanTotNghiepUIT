import { useState } from "react";
import ButtonComponent from "../../components/ui/ButtonComponent";
import IconComponent from "../../components/ui/IconComponent";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./../../slices/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, message } = useSelector((s) => s.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ username, password })).unwrap();
      toast.success(message);
      navigate("/");
    } catch (e) {
      // lỗi đã hiển thị từ Redux state
      // console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center bg-gray-50 py-5">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          <form onSubmit={onSubmit} method="post" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="flex items-center border px-3 py-2 rounded">
                <IconComponent icon={FaUser} color="none" size={16} className="text-gray-400 mr-2" />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Enter your username"
                  className="w-full outline-none text-sm"
                  autoComplete="username"
                  aria-invalid={!!error}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex items-center border px-3 py-2 rounded">
                <IconComponent icon={FaLock} color="none" size={16} className="text-gray-400 mr-2" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="w-full outline-none text-sm"
                  autoComplete="password"
                  aria-invalid={!!error}
                />
              </div>
            </div>

            <ButtonComponent
              title={status === "loading" ? "Đang đăng nhập..." : "Login"}
              disabled={status === "loading"}
              color="black"
              className="w-full mt-2 bg-black text-white hover:bg-gray-800"
              rounded="md"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
