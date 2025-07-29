const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.loaiSanPham.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const getDetailById = async (value) => {
  return await prisma.loaiSanPham.findUnique({
    where: {
      id: Number(value),
    },
  });
};

const findLoaiSanPhamByTenLoai = async (value) => {
  return await prisma.loaiSanPham.findUnique({
    where: {
      tenLoai: value,
    },
  });
};

const findLoaiSanPhamBySlugLoai = async (value) => {
  return await prisma.loaiSanPham.findUnique({
    where: {
      slugLoai: value,
    },
  });
};

const checkTenLoaiExistsExcludeId = async (value, id) => {
  return await prisma.loaiSanPham.findFirst({
    where: {
      tenLoai: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};
const checkSlugLoaiExistsExcludeId = async (value, id) => {
  return await prisma.loaiSanPham.findFirst({
    where: {
      slugLoai: value,
      NOT: {
        id: Number(id),
      },
    },
  });
};

const createLoaiSanPham = async (data) => {
  return await prisma.loaiSanPham.create({
    data: {
      tenLoai: data.tenLoai,
      slugLoai: data.slugLoai,
      moTa: data.moTa,
      hinhAnh: data.hinhAnh,
      trangThai: data.trangThai ?? 1,
    },
  });
};

const updateLoaiSanPham = async (id, data) => {
  return await prisma.loaiSanPham.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteLoaiSanPham = async (data) => {
  return await prisma.loaiSanPham.update({
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
  findLoaiSanPhamByTenLoai,
  findLoaiSanPhamBySlugLoai,
  checkTenLoaiExistsExcludeId,
  checkSlugLoaiExistsExcludeId,
  createLoaiSanPham,
  updateLoaiSanPham,
  deleteLoaiSanPham,
};
