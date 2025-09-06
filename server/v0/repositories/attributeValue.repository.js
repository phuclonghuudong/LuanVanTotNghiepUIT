const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const AttributeValueDTO = require("../models/attributeValue.model");

class AttributeValueDAO {
  async findAll() {
    const result = await prisma.attributeValue.findMany();
    return result.map((x) => new AttributeValueDTO(x));
  }

  async findByStatus1() {
    const result = await prisma.attributeValue.findMany({
      where: {
        status: 1,
      },
    });
    return result.map((x) => new AttributeValueDTO(x));
  }

  async findByStatusNotMinus1() {
    const result = await prisma.attributeValue.findMany({
      where: {
        status: { not: -1 },
      },
    });
    return result.map((x) => new AttributeValueDTO(x));
  }

  async findById(value) {
    const result = await prisma.attributeValue.findUnique({
      where: { value_id: value },
    });
    return result ? new AttributeValueDTO(result) : null;
  }

  async create(data) {
    const result = await prisma.attributeValue.create({
      data: {
        attribute_id: data.attributeId,
        value: data.value,
        display_order: data.displayOrder,
        status: data.status || 1,
      },
    });
    return new AttributeValueDTO(result);
  }

  async update(id, data) {
    const result = await prisma.attributeValue.update({
      where: { value_id: id },
      data: {
        attribute_id: data.attributeId,
        value: data.value,
        display_order: data.displayOrder,
        status: data.status || 1,
      },
    });
    return new AttributeValueDTO(result);
  }

  async delete(id) {
    await prisma.attributeValue.delete({
      where: { attribute_id: id },
    });
  }
}

module.exports = new AttributeValueDAO();
