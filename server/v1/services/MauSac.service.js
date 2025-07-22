const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.mauSac.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const getDetailById = async (value) => {
  return await prisma.mauSac.findUnique({
    where: {
      id: Number(value),
    },
  });
};

const findMauSacByTenMau = async (value) => {
  return await prisma.mauSac.findUnique({
    where: {
      tenMauSac: value,
    },
  });
};

const findMauSacByMaMau = async (value) => {
  return await prisma.mauSac.findUnique({
    where: {
      maMauSac: value,
    },
  });
};

const findMauSacByHexCode = async (value) => {
  return await prisma.mauSac.findUnique({
    where: {
      hexCode: value,
    },
  });
};

const checkTenMauExistsExcludeId = async (value, id) => {
  return await prisma.mauSac.findFirst({
    where: {
      tenMauSac: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const checkMaMauExistsExcludeId = async (value, id) => {
  return await prisma.mauSac.findFirst({
    where: {
      maMauSac: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const checkHexCodeExistsExcludeId = async (value, id) => {
  return await prisma.mauSac.findFirst({
    where: {
      hexCode: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const createMauSac = async (data) => {
  return await prisma.mauSac.create({
    data: {
      tenMauSac: data.tenMauSac,
      maMauSac: data.maMauSac,
      hexCode: data.hexCode,
      moTa: data.moTa,
      trangThai: data.trangThai ?? 1,
    },
  });
};

const updateMauSac = async (id, data) => {
  return await prisma.mauSac.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteMauSac = async (id) => {
  return await prisma.mauSac.update({
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
  findMauSacByTenMau,
  findMauSacByMaMau,
  findMauSacByHexCode,
  createMauSac,
  updateMauSac,
  deleteMauSac,
  checkTenMauExistsExcludeId,
  checkMaMauExistsExcludeId,
  checkHexCodeExistsExcludeId,
};
