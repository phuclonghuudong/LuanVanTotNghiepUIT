const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllRoles,
  getRoleById,
  getRoleBySlug,
  createRole,
  updateRole,
  softDeleteRole,
  getAllRoleActive,
} = require("../controllers/role.controller");

// const PATH = "/access-control/role";

const roleManagement = ["ADMIN", "PERSONNEL"];

// Role - Vai trò
router.get(`/`, getAllRoles);
router.get(`/active`, getAllRoleActive);
router.get(`/slug/:slug`, getRoleBySlug);
router.get(`/:id`, getRoleById);

router.use(authenticate, authorizeRole(...roleManagement));

router.post(`/`, createRole);
router.put(`/:id`, updateRole);
router.patch(`/delete/:id`, softDeleteRole);

module.exports = router;
