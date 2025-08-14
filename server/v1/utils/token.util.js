const jwt = require("jsonwebtoken");
const configKey = require("../configs/configENV");

const verifyAccessToken = async (token) => {
  const secretKey = configKey.SECRET_KEY_ACCESS_TOKEN;
  const verifyToken = await jwt.verify(token, secretKey);
  return verifyToken;
};

const verifyRefreshToken = async (token) => {
  const secretKey = configKey.SECRET_KEY_REFRESH_TOKEN;
  const verifyToken = await jwt.verify(token, secretKey);
  return verifyToken;
};

const generateAccessToken = async (payload) => {
  const secretKey = configKey.SECRET_KEY_ACCESS_TOKEN;
  const expiresIn = configKey.EXPIRES_IN_ACCESS_TOKEN;
  const token = await jwt.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });

  return token;
};

const generateRefreshToken = async (payload) => {
  const secretKey = configKey.SECRET_KEY_REFRESH_TOKEN;
  const expiresIn = configKey.EXPIRES_IN_REFRESH_TOKEN;
  const token = await jwt.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });

  return token;
};

const generateAndSetToken = async (res, payload) => {
  const cookiesOption = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  res.cookie("accessToken", accessToken, cookiesOption);
  res.cookie("refreshToken", refreshToken, cookiesOption);

  return { accessToken, refreshToken };
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  generateAndSetToken,
};
