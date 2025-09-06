const express = require("express");
const router = express.Router();

const AuthUser = require("./authUser.routes");
const Role = require("./role.routes");
const CustomerGroup = require("./customerGroup.routes");
const Brand = require("./brand.routes");
const Category = require("./category.routes");
const CategorySize = require("./categorySize.routes");
const CategoryProduct = require("./categoryProduct.routes");
const Color = require("./color.routes");
const Size = require("./size.routes");
const Upload = require("./upload.routes");
const News = require("./news.routes");
const ManagerProduct = require("./managerProduct.routes");

const BASE_PATH = "/api/v1";

router.use(`${BASE_PATH}/news`, News);

router.use(`${BASE_PATH}/auth`, AuthUser);
router.use(`${BASE_PATH}/access-control/role`, Role);
router.use(`${BASE_PATH}/access-control/customer-group`, CustomerGroup);

router.use(`${BASE_PATH}/upload`, Upload);

router.use(`${BASE_PATH}/catalog-control/brand`, Brand);
router.use(`${BASE_PATH}/catalog-control/category`, Category);
router.use(`${BASE_PATH}/catalog-control/category-product`, CategoryProduct);
router.use(`${BASE_PATH}/catalog-control/category-size`, CategorySize);
router.use(`${BASE_PATH}/catalog-control/color`, Color);
router.use(`${BASE_PATH}/catalog-control/size`, Size);

router.use(`${BASE_PATH}/product`, ManagerProduct);

module.exports = router;
