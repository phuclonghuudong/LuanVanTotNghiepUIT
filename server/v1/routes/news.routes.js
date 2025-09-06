const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const authorizeRole = require("../middlewares/authorizeRole");

const {
  getAllNews,
  getAllNewsActive,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  updateNewsViews,
  softDeleteNews,
} = require("../controllers/news.controller");

// const PATH = "/catalog-control/brand";

const roleManagement = ["ADMIN", "PERSONNEL"];

router.get(`/`, getAllNews);
router.get(`/active`, getAllNewsActive);
router.get(`/slug/:slug`, getNewsBySlug);
router.get(`/:id`, getNewsById);

router.use(authenticate, authorizeRole(...roleManagement));
router.post(`/`, createNews);
router.put(`/:id`, updateNews);
router.patch(`/delete/:id`, softDeleteNews);

module.exports = router;
