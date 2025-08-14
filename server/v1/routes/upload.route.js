const express = require("express");
const router = express.Router();
const { uploadImageAvatar } = require("../controllers/uploadImage.controller");
const upload = require("../middlewares/multer");
const authenticate = require("../middlewares/authenticate");

// const PATH = "/upload";

router.post(
  `/user/avatar`,
  authenticate,
  upload.single("image"),
  uploadImageAvatar
);

module.exports = router;
