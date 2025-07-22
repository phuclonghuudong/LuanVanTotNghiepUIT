const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.thuongHieu.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const getDetailById = async (value) => {
  return await prisma.thuongHieu.findUnique({
    where: {
      id: Number(value),
    },
  });
};

const findThuongHieuByTenThuongHieu = async (value) => {
  return await prisma.thuongHieu.findUnique({
    where: {
      tenThuongHieu: value,
    },
  });
};
const findThuongHieuBySlugThuongHieu = async (value) => {
  return await prisma.thuongHieu.findUnique({
    where: {
      slugThuongHieu: value,
    },
  });
};

const checkTenThuongHieuExistsExcludeId = async (value, id) => {
  return await prisma.thuongHieu.findFirst({
    where: {
      tenThuongHieu: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};
const checkSlugThuongHieuExistsExcludeId = async (value, id) => {
  return await prisma.thuongHieu.findFirst({
    where: {
      slugThuongHieu: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const createThuongHieu = async (data) => {
  return await prisma.thuongHieu.create({
    data: {
      tenThuongHieu: data.tenThuongHieu,
      slugThuongHieu: data.slugThuongHieu,
      moTa: data.moTa,
      hinhAnh: data.hinhAnh,
      trangThai: data.trangThai ?? 1,
    },
  });
};

const updateThuongHieu = async (id, data) => {
  return await prisma.thuongHieu.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteThuongHieu = async (data) => {
  return await prisma.thuongHieu.update({
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
  findThuongHieuBySlugThuongHieu,
  findThuongHieuByTenThuongHieu,
  checkSlugThuongHieuExistsExcludeId,
  checkTenThuongHieuExistsExcludeId,
  createThuongHieu,
  updateThuongHieu,
  deleteThuongHieu,
};
