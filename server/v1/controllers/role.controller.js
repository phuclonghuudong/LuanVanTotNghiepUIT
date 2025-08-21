const RoleBUS = require("../services/role.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllRole = async (req, res, next) => {
  try {
    const result = await RoleBUS.getAllRoles();

    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getAllRoleActive = async (req, res, next) => {
  try {
    const result = await RoleBUS.getAllRoleActive();

    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await RoleBUS.getRoleById(id);

    responseHandler(res, 200, "THÔNG TIN VAI TRÒ", result);
  } catch (error) {
    next(error);
  }
};

const getRoleBySlug = async (req, res, next) => {
  const slug = req.params.slug;
  if (!slug) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");

  try {
    const result = await RoleBUS.getRoleBySlug(slug);

    responseHandler(res, 200, "THÔNG TIN VAI TRÒ", result);
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  const { slug, name, description, isSystem, status } = req.body;
  if (!slug.trim() || !name.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  try {
    const result = await RoleBUS.createRole({
      name,
      slug: slug.trim(),
      description,
      isSystem,
      status,
    });

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  const { slug, name, description, isSystem, status } = req.body;
  const { id } = req.params;

  if (!slug.trim() || !name.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  if (!id) throw new BadRequestError("VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN");
  try {
    const result = await RoleBUS.updateRole(id, {
      name,
      slug: slug.trim(),
      description,
      isSystem,
      status,
    });

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRole,
  getAllRoleActive,
  getRoleById,
  getRoleBySlug,
  createRole,
  updateRole,
};
