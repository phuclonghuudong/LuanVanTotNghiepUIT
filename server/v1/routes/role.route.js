const express = require("express");
const router = express.Router();
const {
  getAllRole,
  getRoleById,
  getRoleBySlug,
  createRole,
  updateRole,
  getAllRoleActive,
} = require("../controllers/role.controller");

// const PATH = "/role";

router.get(`/all`, getAllRole);
router.get(`/active`, getAllRoleActive);
router.get("/detail/:slug", getRoleBySlug);
router.get(`/:id`, getRoleById);
router.post(`/`, createRole);
router.put(`/:id`, updateRole);

module.exports = router;
