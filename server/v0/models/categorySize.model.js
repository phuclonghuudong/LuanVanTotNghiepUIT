class CategorySizeDTO {
  constructor({
    id,
    category_id,
    size_id,
    description,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.category_id = category_id;
    this.size_id = size_id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      categoryId: this.category_id,
      sizeId: this.size_id,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = CategorySizeDTO;
