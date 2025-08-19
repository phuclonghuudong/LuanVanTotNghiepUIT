import axios from "axios";

const loginApi = (username, password) => {
  return axios.post(
    "http://localhost:3005/api/v1/auth/customer/sign-in",
    {username, password},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export {loginApi};
