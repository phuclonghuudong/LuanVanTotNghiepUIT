const express = require("express");
const router = express.Router();
const {
  uploadImageAvatar,
  uploadImageProduct,
} = require("../controllers/uploadImage.controller");
const upload = require("../middlewares/multer");
const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

// const PATH = "/upload";

router.post(
  `/user/avatar`,
  authenticate,
  upload.single("image"),
  uploadImageAvatar
);

const roleManagement = ["ADMIN", "PERSONNEL"];

router.use(authenticate, authorizeRole(...roleManagement));
router.post(
  `/product/upload-image`,
  upload.single("image"),
  uploadImageProduct
);

router.post(`/news/upload-image`, upload.single("image"), uploadImageProduct);

module.exports = router;
