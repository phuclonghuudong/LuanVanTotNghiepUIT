const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllList = async () => {
  return await prisma.loaisanpham.findMany({
    orderBy: {
      id_loai: "asc",
    },
  });
};

const getDetailById = async (value) => {
  return await prisma.loaisanpham.findUnique({
    where: {
      id_loai: Number(value),
    },
  });
};

const findLoaiSanPhamByTenLoai = async (value) => {
  return await prisma.loaisanpham.findUnique({
    where: {
      tenloai: value,
    },
  });
};
const findLoaiSanPhamBySlugLoai = async (value) => {
  return await prisma.loaisanpham.findUnique({
    where: {
      slugloai: value,
    },
  });
};

const checkTenLoaiExistsExcludeId = async (value, id) => {
  return await prisma.loaisanpham.findFirst({
    where: {
      tenloai: value,
      NOT: {
        id_loai: Number(id),
      },
    },
  });
};
const checkSlugLoaiExistsExcludeId = async (value, id) => {
  return await prisma.loaisanpham.findFirst({
    where: {
      slugloai: value,
      NOT: {
        id_loai: Number(id),
      },
    },
  });
};

const createLoaiSanPham = async (data) => {
  return await prisma.loaisanpham.create({
    data: {
      tenloai: data.tenloai,
      slugloai: data.slugloai,
      mota: data.mota,
      hinhanh: data.hinhanh,
      trangthai: data.trangthai ?? 1,
    },
  });
};

const updateLoaiSanPham = async (id, data) => {
  return await prisma.loaisanpham.update({
    where: {
      id_loai: Number(id),
    },
    data: {
      ...data,
    },
  });
};

const deleteLoaiSanPham = async (data) => {
  return await prisma.loaisanpham.update({
    where: {
      id_loai: Number(id),
    },
    data: {
      trangthai: -1,
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
