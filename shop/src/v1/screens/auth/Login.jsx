import {useState} from "react";
import ButtonComponent from "../../components/ui/ButtonComponent";
import IconComponent from "../../components/ui/IconComponent";
import {FaUser, FaLock} from "react-icons/fa";
import {loginApi} from "../../apis/userApi";
import {toast} from "react-toastify";
import {useNavigate, useLocation} from "react-router-dom";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // { username?: string, password?: string }
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // fallback

  const handleLogin = async (e) => {
    e?.preventDefault();
    setErrors({});

    // Validate đơn giản phía client
    const local = {};
    if (!username) local.username = "Vui lòng nhập username";
    if (!password) local.password = "Vui lòng nhập mật khẩu";
    if (Object.keys(local).length) {
      setErrors(local);
      toast.error("Vui lòng kiểm tra thông tin");
      return;
    }

    setLoading(true);
    try {
      const res = await loginApi(username, password);

      if (res.status === 200 || res.status === 201) {
        const data = res.data || {};
        const accessToken =
          data?.DATA?.accessToken ??
          data?.data?.accessToken ??
          data?.accessToken ??
          data?.token ??
          data?.DATA?.TOKEN ??
          // đôi khi server trả trong header: Authorization: Bearer xxx
          (res.headers?.authorization?.startsWith("Bearer ") ? res.headers.authorization.slice(7) : undefined);

        if (!accessToken) {
          toast.error("Không tìm thấy token trong phản hồi");
          console.error("LOGIN_OK_BUT_NO_TOKEN:", res);
          return;
        }

        // Lưu vào localStorage
        if (accessToken) localStorage.setItem("access_token", accessToken);

        toast.success("Đăng nhập thành công");
        // ... điều hướng trang, nạp profile, v.v.
        navigate(from, {replace: true});
        return data;
      }
      if (res.status === 204) {
        toast.success("Đăng nhập thành công (no content)");
        return;
      }
    } catch (error) {
      const {status, data} = error?.response || {};

      // Sai tài khoản/mật khẩu theo format backend
      if (status === 400 && data?.CODE === "400400") {
        const msg = data?.MESSAGE || "Tài khoản hoặc mật khẩu không chính xác";
        setErrors({username: msg, password: msg}); // gán cho cả 2 field
        toast.error(msg);
      } else {
        // toast.error(getApiErrorMessage(error, "Đăng nhập thất bại"));
        toast.error(error, "Đăng nhập thất bại");
      }

      // console.error("LOGIN_ERROR:", {
      //   status: error?.response?.status,
      //   data: error?.response?.data,
      // });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center bg-gray-50 py-5">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            method="post"
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="flex items-center border px-3 py-2 rounded">
                <IconComponent icon={FaUser} color="none" size={16} className="text-gray-400 mr-2" />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full outline-none text-sm"
                  autoComplete="username"
                  aria-invalid={!!errors.username}
                />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex items-center border px-3 py-2 rounded">
                <IconComponent icon={FaLock} color="none" size={16} className="text-gray-400 mr-2" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full outline-none text-sm"
                  autoComplete="password"
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <ButtonComponent
              title={loading ? "Đang đăng nhập..." : "Login"}
              disabled={loading}
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
