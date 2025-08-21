// src/apis/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3005/", // KHÔNG lặp /v1 ở đây
  withCredentials: true, // nếu backend dùng cookie
  timeout: 15000,
});

// Tự gắn Authorization nếu có token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; // ✅ default export
