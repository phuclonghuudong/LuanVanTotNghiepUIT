const { PrismaClient } = require("@prisma/client");
const RoleDTO = require("../models/role.model");
const prisma = new PrismaClient();

class RoleDAO {
  async findAllRoles() {
    const result = await prisma.role.findMany();
    return result.map((x) => new RoleDTO(x));
  }

  async findActiveRoles(status = 1) {
    const result = await prisma.role.findMany({
      where: { status },
    });
    return result.map((c) => new RoleDTO(c));
  }

  async findAvailableRoles() {
    const result = await prisma.role.findMany({
      where: { status: { not: -1 } },
    });
    return result.map((c) => new RoleDTO(c));
  }

  async findRoleByStatus(status = 1) {
    const result = await prisma.role.findMany({
      where: { status },
    });
    return result.map((c) => new RoleDTO(c));
  }

  async findRoleById(id) {
    const result = await prisma.role.findUnique({
      where: { role_id: Number(id) },
    });
    return result ? new RoleDTO(result) : result;
  }

  async findRoleByName(name) {
    const result = await prisma.role.findUnique({ where: { role_name: name } });
    return result ? new RoleDTO(result) : result;
  }

  async findRoleBySlug(slug) {
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
        is_system: data.isSystem ?? false,
        status: Number(data.status) ?? 1,
      },
    });
    return new RoleDTO(result);
  }

  async update(id, data) {
    const result = await prisma.role.update({
      where: { role_id: Number(id) },
      data: {
        role_name: data.name,
        role_slug: data.slug,
        description: data.description,
        is_system: data.isSystem,
        status: Number(data.status),
      },
    });
    return new RoleDTO(result);
  }

  async softDeleteRole(id) {
    const result = await prisma.role.update({
      where: { role_id: Number(id) },
      data: { status: -1 },
    });
    return new RoleDTO(result);
  }

  async hardDeleteRole(id) {
    const result = await prisma.role.delete({
      where: { role_id: Number(id) },
    });
    return new RoleDTO(result);
  }
}

module.exports = new RoleDAO();
