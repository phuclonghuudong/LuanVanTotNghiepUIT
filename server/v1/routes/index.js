const express = require("express");
const router = express.Router();
const Category = require("./category.route");
const Brand = require("./brand.route");
const Role = require("./role.route");
const CustomerGroup = require("./customerGroup.route");
const Account = require("./account.route");
const Customer = require("./customer.route");
const Auth = require("./auth.route");
const Upload = require("./upload.route");
const Address = require("./address.route");

const BASE_PATH = "/api/v1";

router.use(`${BASE_PATH}/category`, Category);
router.use(`${BASE_PATH}/brand`, Brand);
router.use(`${BASE_PATH}/role`, Role);
router.use(`${BASE_PATH}/group`, CustomerGroup);
router.use(`${BASE_PATH}/account`, Account);
router.use(`${BASE_PATH}/customer`, Customer);
router.use(`${BASE_PATH}/auth`, Auth);
router.use(`${BASE_PATH}/upload`, Upload);
router.use(`${BASE_PATH}/address`, Address);

module.exports = router;
