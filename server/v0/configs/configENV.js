const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 1999,
  SERVER_URL: process.env.SERVER_URL || "http://localhost:",
  FRONTEND_URL: process.env.FRONTEND_URL || "*",

  // token
  SECRET_KEY_ACCESS_TOKEN:
    process.env.SECRET_KEY_ACCESS_TOKEN || "secret key access token",
  SECRET_KEY_REFRESH_TOKEN:
    process.env.SECRET_KEY_REFRESH_TOKEN || "secret key refresh token",
  EXPIRES_IN_ACCESS_TOKEN: process.env.EXPIRES_IN_ACCESS_TOKEN || "1h",
  EXPIRES_IN_REFRESH_TOKEN: process.env.EXPIRES_IN_REFRESH_TOKEN || "7d",

  // cloudinary
  CLOUD_URL: process.env.CLOUDINARY_URL || "cloudinary url",
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "cloudinary name",
  CLOUD_API_KEY: process.env.CLOUDINARY_API_KEY || "cloudinary key",
  CLOUD_API_SECRET: process.env.CLOUDINARY_API_SECRET || "cloudinary secret",
};
