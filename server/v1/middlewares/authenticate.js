const { UnauthorizedError } = require("../utils/errors");
const { verifyAccessToken } = require("../utils/token.util");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.trim())
    throw new UnauthorizedError("KHÔNG CÓ QUYỀN TRUY CẬP");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedError("TOKEN KHÔNG HỢP LỆ");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyAccessToken(token);
    if (!decoded) throw new UnauthorizedError("TOKEN KHÔNG HỢP LỆ");

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("TOKEN HẾT HẠN");
    }
    throw new UnauthorizedError("TOKEN KHÔNG HỢP LỆ");
  }
};

module.exports = authenticate;
