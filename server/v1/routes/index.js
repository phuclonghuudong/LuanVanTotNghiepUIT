const express = require("express");
const router = express.Router();
const Category = require("./category.route");
const CategoryProduct = require("./categoryProduct.route");
const Brand = require("./brand.route");
const Role = require("./role.route");
const CustomerGroup = require("./customerGroup.route");
const Account = require("./account.route");
const Customer = require("./customer.route");
const Auth = require("./auth.route");
const Upload = require("./upload.route");
const Address = require("./address.route");
const Attribute = require("./attribute.route");
const CategoryAttribute = require("./categoryAttribute.route");
const CategorySize = require("./categorySize.route");
const Color = require("./color.route");
const Size = require("./size.route");
const Product = require("./product.route");

const BASE_PATH = "/api/v1";

router.use(`${BASE_PATH}/category`, Category);
router.use(`${BASE_PATH}/category-product`, CategoryProduct);
router.use(`${BASE_PATH}/brand`, Brand);
router.use(`${BASE_PATH}/role`, Role);
router.use(`${BASE_PATH}/group`, CustomerGroup);
router.use(`${BASE_PATH}/account`, Account);
router.use(`${BASE_PATH}/customer`, Customer);
router.use(`${BASE_PATH}/auth`, Auth);
router.use(`${BASE_PATH}/upload`, Upload);
router.use(`${BASE_PATH}/address`, Address);
router.use(`${BASE_PATH}/attribute`, Attribute);
router.use(`${BASE_PATH}/category-attribute`, CategoryAttribute);
router.use(`${BASE_PATH}/category-size`, CategorySize);
router.use(`${BASE_PATH}/color`, Color);
router.use(`${BASE_PATH}/size`, Size);
router.use(`${BASE_PATH}/product`, Product);

module.exports = router;
