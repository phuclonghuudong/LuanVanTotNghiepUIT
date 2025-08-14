const { BadRequestError } = require("../utils/errors");

const validateParams = (req, res, next) => {
  const slug = req.params.slug;

  if (!slug?.trim()) {
    throw new BadRequestError("THIẾU THAM SỐ TRUYỀN VÀO");
  }

  req.slug = slug.trim().toLowerCase();
  next();
};

module.exports = validateParams;
