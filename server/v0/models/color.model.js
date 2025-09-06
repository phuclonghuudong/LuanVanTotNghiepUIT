class ColorDTO {
  constructor({
    color_id,
    color_name,
    color_code,
    display_order,
    status,
    createdAt,
    updatedAt,
  }) {
    this.color_id = color_id;
    this.color_name = color_name;
    this.color_code = color_code;
    this.display_order = display_order;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.color_id,
      name: this.color_name,
      code: this.color_code,
      displayOrder: this.display_order,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ColorDTO;
