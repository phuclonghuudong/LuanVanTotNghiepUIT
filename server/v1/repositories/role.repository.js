const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const RoleDTO = require("../models/role.model");

class RoleDAO {
  async findAll() {
    const result = await prisma.role.findMany();
    return result.map((c) => new RoleDTO(c));
  }

  async findById(id) {
    const result = await prisma.role.findUnique({
      where: { role_id: id },
    });
    return result ? new RoleDTO(result) : result;
  }

  async findByName(name) {
    const result = await prisma.role.findUnique({ where: { role_name: name } });
    return result ? new RoleDTO(result) : result;
  }

  async findBySlug(slug) {
    const result = await prisma.role.findUnique({
      where: { role_slug: slug },
    });
    return result ? new RoleDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.role.create({
      data: {
        role_name: data.name,
        role_slug: data.slug,
        description: data.description,
        is_system: data.isSystem || false,
        status: data.status || 1,
      },
    });
    return new RoleDTO(result);
  }

  async update(id, data) {
    const result = await prisma.role.update({
      where: { role_id: id },
      data: {
        role_name: data.name,
        role_slug: data.slug,
        description: data.description,
        is_system: Boolean(data.isSystem),
        status: data.status,
      },
    });
    return new RoleDTO(result);
  }

  async delete(id) {
    await prisma.role.delete({
      where: { role_id: id },
    });
  }
}
module.exports = new RoleDAO();
