const express = require("express");
const router = express.Router();
const {
  getAllList,
  getDetailById,
  create,
  update,
} = require("../controllers/KichCo.controller");

router.get(`/`, getAllList);
router.get(`/:id`, getDetailById);
router.post(`/create`, create);
router.put(`/update/:id`, update);

module.exports = router;
