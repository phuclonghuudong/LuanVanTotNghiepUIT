const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.sanPham.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

module.exports = {
  getAllList,
};
