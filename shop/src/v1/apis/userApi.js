import api from "./api";

const loginApi = (username, password) => {
  return api.post("auth/customer/sign-in", { username, password });
};
const getProfile = () => {
  return api.get("/auth/customer/profile");
};

export { loginApi, getProfile };
