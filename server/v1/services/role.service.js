const RoleDAO = require("../repositories/role.repository");
const { NotFoundError, ConflictError } = require("../utils/errors");

class RoleBUS {
  async getAllRoles() {
    const result = await RoleDAO.findAll();
    if (!result || result.length === 0)
      throw new NotFoundError("CHƯA CÓ DỮ LIỆU");

    return result.map((x) => x.toJSON?.() ?? x);
  }

  async getRoleById(id) {
    const result = await RoleDAO.findById(Number(id));
    if (!result) throw new NotFoundError("ID KHÔNG TỒN TẠI DỮ LIỆU");

    return result.toJSON?.() ?? result;
  }

  async getRoleBySlug(slug) {
    const result = await RoleDAO.findBySlug(slug);
    if (!result)
      throw new NotFoundError("ĐỊNH DANH KHÔNG TỒN TẠI NHÓM VAI TRÒ");

    return result.toJSON?.() ?? result;
  }

  async validateForCreate(slug, name) {
    const [existingBySlug, existingByName] = await Promise.all([
      RoleDAO.findBySlug(slug),
      RoleDAO.findByName(name),
    ]);

    if (existingBySlug) throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI");
    if (existingByName) throw new ConflictError("TÊN LOẠI ĐÃ TỒN TẠI");
  }

  async validateForUpdate(slug, name, excludeId) {
    const [existingBySlug, existingByName] = await Promise.all([
      RoleDAO.findBySlug(slug),
      RoleDAO.findByName(name),
    ]);
    if (existingBySlug && Number(existingBySlug.role_id) !== Number(excludeId))
      throw new ConflictError("TÊN ĐỊNH DANH ĐÃ TỒN TẠI Ở DANH MỤC KHÁC!");
    if (existingByName && Number(existingByName.role_id) !== Number(excludeId))
      throw new ConflictError(" TÊN ĐÃ TỒN TẠI Ở DANH MỤC KHÁC");
  }

  async createRole(data) {
    await this.validateForCreate(data.slug, data.name);
    const result = await RoleDAO.create(data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async updateRole(id, data) {
    const oldRole = await this.getRoleById(Number(id));

    await this.validateForUpdate(data.slug, data.name, id);

    const isUnchanged =
      oldRole.role_name === data.name &&
      oldRole.is_system === data.isSystem &&
      oldRole.role_slug === data.slug &&
      oldRole.description === data.description &&
      Number(oldRole.status) === Number(data.status);
    if (isUnchanged) throw new ConflictError("KHÔNG CÓ GÌ THAY ĐỔI");

    const result = await RoleDAO.update(Number(id), data);

    if (!result || result.length === 0)
      throw new BadRequestError("THAO TÁC KHÔNG THÀNH CÔNG, VUI LÒNG THỬ LẠI");

    return result.toJSON?.() ?? result;
  }

  async deleteRole(id) {
    await this.getRoleById(id);
    await RoleDAO.delete(Number(id));
  }
}

module.exports = new RoleBUS();
