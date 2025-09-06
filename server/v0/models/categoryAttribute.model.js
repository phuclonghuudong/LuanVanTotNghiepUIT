class CategoryAttributeDTO {
  constructor({
    id,
    category_id,
    attribute_id,
    description,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.category_id = category_id;
    this.attribute_id = attribute_id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      categoryId: this.category_id,
      attributeId: this.attribute_id,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = CategoryAttributeDTO;
