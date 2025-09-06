const RoleDAO = require("../repositories/role.repository");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../utils/errors");

class RoleBUS {
  async getAllRoles() {
    const result = await RoleDAO.findAllRoles();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getAllRoleActive() {
    const result = await RoleDAO.findActiveRoles();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getRoleById(id) {
    if (!id || isNaN(id)) {
      throw new BadRequestError("ID KHÔNG HỢP LỆ");
    }

    const result = await RoleDAO.findRoleById(id);
    if (!result || result.length == 0)
      throw new NotFoundError("VAI TRÒ KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getRoleByName(slug) {
    if (!slug || isNaN(slug)) {
      throw new BadRequestError("ĐỊNH DANH KHÔNG HỢP LỆ");
    }

    const result = await RoleDAO.findRoleByName(slug);
    if (!result) throw new NotFoundError("TÊN VAI TRÒ KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async getRoleBySlug(slug) {
    const result = await RoleDAO.findRoleBySlug(slug);
    if (!result) throw new NotFoundError("ĐỊNH DANH VAI TRÒ KHÔNG TỒN TẠI");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      RoleDAO.findRoleBySlug(slug),
      RoleDAO.findRoleByName(name),
    ]);

    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN VAI TRÒ ĐÃ TỒN TẠI");
  }

  async validateForUpdate(excludeId, data) {
    const { slug, name } = data;
    const [existingBySlug, existingByName] = await Promise.all([
      RoleDAO.findRoleBySlug(slug),
      RoleDAO.findRoleByName(name),
    ]);
    if (existingBySlug && Number(existingBySlug.role_id) !== Number(excludeId))
      throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI ");
    if (existingByName && Number(existingByName.role_id) !== Number(excludeId))
      throw new ConflictError(" TÊN VAI TRÒ ĐÃ TỒN TẠI ");
  }

  async createRole(data) {
    await this.validateForCreate(data);
    const result = await RoleDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateRole(id, data) {
    const oldRole = await this.getRoleById(id);

    await this.validateForUpdate(id, data);

    const isUnchanged =
      oldRole.name === data.name &&
      oldRole.isSystem === data.isSystem &&
      oldRole.slug === data.slug &&
      oldRole.description === data.description &&
      Number(oldRole.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await RoleDAO.update(id, data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async softDeleteRole(id) {
    await this.getRoleById(id);
    const result = await RoleDAO.softDeleteRole(id);
    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }
}

module.exports = new RoleBUS();
