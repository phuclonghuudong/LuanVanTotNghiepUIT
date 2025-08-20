// api/index.js
import axios from "axios";
import { getAccessToken, clearAuth } from "../utils/auth";

const api = axios.create({
  baseURL: "http://localhost:3005/api/v1",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Nếu token sai/hết hạn → xoá token và về /login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      clearAuth();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
