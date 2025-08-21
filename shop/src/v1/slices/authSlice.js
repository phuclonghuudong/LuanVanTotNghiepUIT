// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "../apis/shop/userApi";

//  response → luôn trả { token, user, message }
function normalizeLoginResponse(resp) {
  // Mã code: { CODE, SUCCESS, ERROR, MESSAGE, DATA }
  const box = resp?.data ?? resp ?? {};
  const token =
    box.DATA.accessToken || box.DATA.token || box.DATA.TOKEN || box.DATA.jwt || box.DATA.access_token || null;
  const user = box.DATA.user || box.DATA.USER || box.DATA.profile || box.DATA.customer || box.data || null;
  const message = box.message || box.MESSAGE;
  return { token, user, message };
}

export const login = createAsyncThunk("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    // Nếu backend muốn { username, password } hoặc { phone, password } thì đổi ở đây
    const { data } = await signIn({ username, password });

    const { token, user, message } = normalizeLoginResponse(data);
    if (!token) {
      // server 200 nhưng không có token → coi là thất bại
      const msg = data?.MESSAGE || data?.message || "Thiếu token trong phản hồi";
      return rejectWithValue(msg);
    }
    return { token, user, message };
  } catch (err) {
    const body = err?.response?.data;
    const msg = body?.MESSAGE || body?.message || err?.message || "Login failed";
    return rejectWithValue(msg);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("accessToken") || null,
    user: null,
    message: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.status = "loading";
      s.error = null;
    });
    b.addCase(login.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.token = a.payload?.token || null;
      s.user = a.payload?.user || null;
      s.message = a.payload?.message;
      s.isLoggedIn = true;
      if (s.token) localStorage.setItem("accessToken", s.token);
    });
    b.addCase(login.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.payload || "Login failed";
      // không đụng state.token nếu bạn muốn giữ token cũ; ở đây để nguyên
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
