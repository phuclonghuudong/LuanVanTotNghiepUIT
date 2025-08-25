const { ForbiddenError } = require("../utils/errors");
// ADMIN, PERSONNEL, CUSTOMER,

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      throw new ForbiddenError("KHÔNG XÁC ĐỊNH ĐƯỢC QUYỀN");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError("BẠN KHÔNG CÓ QUYỀN TRUY CẬP");
    }

    next();
  };
};

module.exports = authorizeRole;
