const express = require("express");
const router = express.Router();
const Category = require("./category.route");
const CategoryProduct = require("./categoryProduct.route");
const Brand = require("./brand.route");
const Role = require("./role.route");
const CustomerGroup = require("./customerGroup.route");
const Account = require("./account.route");
const Customer = require("./customer.route");
const AuthCustomer = require("./authCustomer.route");
const Upload = require("./upload.route");
const Address = require("./address.route");
const Attribute = require("./attribute.route");

const BASE_PATH = "/api/v1";

router.use(`${BASE_PATH}/category`, Category);
router.use(`${BASE_PATH}/category-product`, CategoryProduct);
router.use(`${BASE_PATH}/brand`, Brand);
router.use(`${BASE_PATH}/role`, Role);
router.use(`${BASE_PATH}/group`, CustomerGroup);
router.use(`${BASE_PATH}/account`, Account);
router.use(`${BASE_PATH}/customer`, Customer);
router.use(`${BASE_PATH}/auth`, AuthCustomer);
router.use(`${BASE_PATH}/upload`, Upload);
router.use(`${BASE_PATH}/address`, Address);
router.use(`${BASE_PATH}/attribute`, Attribute);

module.exports = router;
