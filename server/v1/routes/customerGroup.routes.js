const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  softDeleteGroup,
  getAllGroupActive,
} = require("../controllers/customerGroup.controller");

// const PATH = "/access-control/customer-group";

const roleManagement = ["ADMIN", "PERSONNEL"];

router.get(`/`, getAllGroups);
router.get(`/active`, getAllGroupActive);
router.get(`/:id`, getGroupById);
router.use(authenticate, authorizeRole(...roleManagement));

router.post(`/`, createGroup);
router.put(`/:id`, updateGroup);
router.patch(`/delete/:id`, softDeleteGroup);

module.exports = router;
