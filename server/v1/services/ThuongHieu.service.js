const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.thuonghieu.findMany({
    orderBy: {
      id_thuonghieu: "asc",
    },
  });
};

const getDetailById = async (value) => {
  return await prisma.thuonghieu.findUnique({
    where: {
      id_thuonghieu: Number(value),
    },
  });
};

const findThuongHieuByTenThuongHieu = async (value) => {
  return await prisma.thuonghieu.findUnique({
    where: {
      tenthuonghieu: value,
    },
  });
};
const findThuongHieuBySlugThuongHieu = async (value) => {
  return await prisma.thuonghieu.findUnique({
    where: {
      slugthuonghieu: value,
    },
  });
};

const checkTenThuongHieuExistsExcludeId = async (value, id) => {
  return await prisma.thuonghieu.findFirst({
    where: {
      tenthuonghieu: value,
      NOT: {
        id_thuonghieu: Number(id),
      },
    },
  });
};
const checkSlugThuongHieuExistsExcludeId = async (value, id) => {
  return await prisma.thuonghieu.findFirst({
    where: {
      slugthuonghieu: value,
      NOT: {
        id_thuonghieu: Number(id),
      },
    },
  });
};

const createThuongHieu = async (data) => {
  return await prisma.thuonghieu.create({
    data: {
      tenthuonghieu: data.tenthuonghieu,
      slugthuonghieu: data.slugthuonghieu,
      mota: data.mota,
      hinhanh: data.hinhanh,
      trangthai: data.trangthai ?? 1,
    },
  });
};

const updateThuongHieu = async (id, data) => {
  return await prisma.thuonghieu.update({
    where: {
      id_thuonghieu: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteThuongHieu = async (data) => {
  return await prisma.thuonghieu.update({
    where: {
      id_thuonghieu: Number(id),
    },
    data: {
      trangthai: -1,
    },
  });
};

module.exports = {
  getAllList,
  getDetailById,
  findThuongHieuBySlugThuongHieu,
  findThuongHieuByTenThuongHieu,
  checkSlugThuongHieuExistsExcludeId,
  checkTenThuongHieuExistsExcludeId,
  createThuongHieu,
  updateThuongHieu,
  deleteThuongHieu,
};
