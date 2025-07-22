const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.kichCo.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const getDetailById = async (value) => {
  return await prisma.kichCo.findUnique({
    where: {
      id: Number(value),
    },
  });
};

const findByTen = async (value) => {
  return await prisma.kichCo.findUnique({
    where: {
      tenKichCo: value,
    },
  });
};

const findByMa = async (value) => {
  return await prisma.kichCo.findUnique({
    where: {
      maKichCo: value,
    },
  });
};

const checkTenExistsExcludeId = async (value, id) => {
  return await prisma.kichCo.findFirst({
    where: {
      tenKichCo: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const checkMaExistsExcludeId = async (value, id) => {
  return await prisma.kichCo.findFirst({
    where: {
      maKichCo: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const createKichCo = async (data) => {
  return await prisma.kichCo.create({
    data: {
      tenKichCo: data.tenKichCo,
      maKichCo: data.maKichCo,
      moTa: data.moTa,
      trangThai: data.trangThai ?? 1,
    },
  });
};

const updateKichCo = async (id, data) => {
  return await prisma.kichCo.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteKichCo = async (id) => {
  return await prisma.kichCo.update({
    where: {
      id: Number(id),
    },
    data: {
      trangThai: -1,
    },
  });
};

module.exports = {
  getAllList,
  getDetailById,
  findByMa,
  findByTen,
  checkMaExistsExcludeId,
  checkTenExistsExcludeId,
  createKichCo,
  updateKichCo,
  deleteKichCo,
};
