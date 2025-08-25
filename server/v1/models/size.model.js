class SizeDTO {
  constructor({
    size_id,
    size_name,
    size_code,
    size_type,
    display_order,
    status,
    createdAt,
    updatedAt,
  }) {
    this.size_id = size_id;
    this.size_name = size_name;
    this.size_type = size_type;
    this.size_code = size_code;
    this.display_order = display_order;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.size_id,
      name: this.size_name,
      code: this.size_code,
      type: this.size_type,
      displayOrder: this.display_order,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = SizeDTO;
