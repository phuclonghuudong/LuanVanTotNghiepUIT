const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PersonnelDTO = require("../models/personnel.model");

class PersonnelDAO {
  async findAllPersonnel() {
    const result = await prisma.personnel.findMany();
    return result.map((x) => new PersonnelDTO(x));
  }

  async findPersonnelById(id) {
    const result = await prisma.personnel.findUnique({
      where: { personnel_id: Number(id) },
    });
    return result ? new PersonnelDTO(result) : result;
  }

  async findPersonnelByAccountId(value) {
    const result = await prisma.personnel.findUnique({
      where: { account_id: Number(value) },
    });
    return result ? new PersonnelDTO(result) : result;
  }

  async create(data) {
    const result = await prisma.personnel.create({
      data: {
        fullname: data.fullname,
        gender: data.gender || null,
        birthday: data.birthday || null,
        cccd: data.cccd ?? null,
        address: data.address || null,
        avatar: data.address || null,
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
        gender: data.gender || null,
        birthday: data.birthday || null,
        cccd: data.cccd ?? null,
        address: data.address || null,
        avatar: data.address || null,
        status: Number(data.status) ?? 1,
      },
    });
    return new PersonnelDTO(result);
  }

  async updateStatusPersonnel(id, status) {
    const result = await prisma.personnel.update({
      where: { personnel_id: Number(id) },
      data: { status: Number(status) },
    });
    return new PersonnelDTO(result);
  }

  async softDeletePersonnel(id) {
    const result = await prisma.personnel.update({
      where: { personnel_id: Number(id) },
      data: { status: -1 },
    });
    return new PersonnelDTO(result);
  }

  async hardDeletePersonnel(id) {
    const result = await prisma.personnel.delete({
      where: { personnel_id: Number(id) },
    });
    return new PersonnelDTO(result);
  }
}

module.exports = new PersonnelDAO();
