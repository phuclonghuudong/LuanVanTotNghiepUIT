const RoleBUS = require("../services/role.service");
const { BadRequestError } = require("../utils/errors");
const responseHandler = require("../utils/responseHandler");

const getAllRoles = async (req, res, next) => {
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
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await RoleBUS.getRoleById(id);
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const getRoleBySlug = async (req, res, next) => {
  const slug = req.params.slug || {};

  if (!slug?.trim()) {
    throw new BadRequestError(
      "ĐỊNH DANH KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await RoleBUS.getRoleBySlug(slug);
    responseHandler(res, 200, "DANH SÁCH", result);
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  const { slug, name, description, isSystem, status } = req.body || {};
  if (!slug?.trim() || !name?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");
  try {
    const validInput = req.body;
    const result = await RoleBUS.createRole(validInput);

    responseHandler(res, 201, "THÊM THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  const { slug, name, description, isSystem, status } = req.body || {};
  const { id } = req.params;

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }
  if (!slug?.trim() || !name?.trim())
    throw new BadRequestError("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN");

  try {
    const validInput = req.body;
    const result = await RoleBUS.updateRole(id, validInput);

    responseHandler(res, 200, "CẬP NHẬT THÀNH CÔNG", result);
  } catch (error) {
    next(error);
  }
};

const softDeleteRole = async (req, res, next) => {
  const { id } = req.params;

  if (id <= 0 || isNaN(id)) {
    throw new BadRequestError(
      "ID KHÔNG HỢP LỆ, VUI LÒNG CUNG CẤP ĐẦY ĐỦ THÔNG TIN"
    );
  }

  try {
    const result = await RoleBUS.softDeleteRole(id);

    responseHandler(res, 200, "XÓA DỮ LIỆU THÀNH CÔNG");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles,
  getAllRoleActive,
  getRoleById,
  getRoleBySlug,
  createRole,
  updateRole,
  softDeleteRole,
};
