class AttributeValueDTO {
  constructor({
    value_id,
    attribute_id,
    value, // Giá trị
    display_order, // Thứ tự hiển thị
    status,
    createdAt,
    updatedAt,
  }) {
    this.value_id = value_id;
    this.attribute_id = attribute_id;
    this.value = value;
    this.display_order = display_order;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  toJSON() {
    return {
      id: this.value_id,
      attributeId: this.attribute_id,
      value: this.value,
      displayOrder: this.display_order,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = AttributeValueDTO;
