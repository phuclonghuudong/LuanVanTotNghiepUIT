// utils/auth.js
export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

/** Lưu token vào localStorage */
export function saveAuth({ accessToken, refreshToken } = {}) {
  if (typeof window === "undefined") return;
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/** Lấy Access Token từ localStorage */
export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/** Lấy Refresh Token từ localStorage */
export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/** Xoá toàn bộ token (logout) */
export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/** Tạo header Authorization nếu có token */
export function getAuthHeader() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Giải mã payload của JWT (không xác thực chữ ký) */
export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    // Base64URL -> Base64
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** Kiểm tra token hết hạn (skew giây để bù trễ đồng hồ) */
export function isTokenExpired(token, skewSeconds = 30) {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // không có exp thì coi như chưa biết
  const now = Math.floor(Date.now() / 1000);
  return now >= payload.exp - skewSeconds;
}

/** Đã đăng nhập hay chưa (có token và chưa hết hạn nếu có exp) */
export function isAuthenticated() {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired(token);
}
