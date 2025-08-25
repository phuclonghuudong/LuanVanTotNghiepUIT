// src/apis/userApi.js
import api from "../api.js";

// Đổi payload cho đúng backend: { email, password } hoặc { username, password }...
export const signIn = (payload) => api.post("/api/v1/auth/sign-in", payload);

// Optional: endpoint lấy profile sau khi đăng nhập
// (Đổi URL cho đúng backend của bạn, ví dụ /v1/api/auth/me)
export const getMe = () => api.get("/v1/api/auth/profile");
