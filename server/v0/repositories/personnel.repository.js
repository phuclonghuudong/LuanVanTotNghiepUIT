const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PersonnelDTO = require("../models/personnel.model");

class PersonnelDAO {
  async findAll() {
    const result = await prisma.personnel.findMany();
    return result.map((x) => new PersonnelDTO(x));
  }

  async findById(id) {
    const result = await prisma.personnel.findUnique({
      where: { personnel_id: Number(id) },
    });
    return result ? new PersonnelDTO(result) : null;
  }

  async findByAccountId(value) {
    const result = await prisma.personnel.findUnique({
      where: { account_id: value },
    });
    return result ? new PersonnelDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.personnel.create({
      data: {
        fullname: data.fullname,
        gender: data.gender || "",
        birthday: data.birthday || "",
        cccd: data.cccd || 0,
        address: data.address || "",
        avatar: data.address || "",
        status: Number(data.status) ?? 1,
      },
    });
    return new PersonnelDTO(result);
  }

  async update(id, data) {
    const result = await prisma.personnel.update({
      where: { personnel_id: Number(id) },
      data: {
        fullname: data.fullname,
        gender: data.gender || "",
        birthday: data.birthday || "",
        cccd: data.cccd || 0,
        address: data.address || "",
        avatar: data.address || "",
        status: Number(data.status),
      },
    });
    return new PersonnelDTO(result);
  }

  async delete(id) {
    await prisma.personnel.delete({
      where: { personnel_id: Number(id) },
    });
  }
}

module.exports = new PersonnelDAO();
