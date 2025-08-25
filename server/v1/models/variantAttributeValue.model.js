class VariantAttributeValueDTO {
  constructor({
    id,
    attribute_id,
    value_id,
    custom_value,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.attribute_id = attribute_id;
    this.value_id = value_id;
    this.custom_value = custom_value;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      attributeId: this.attribute_id,
      attributeValueId: this.value_id,
      customValue: this.custom_value,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = VariantAttributeValueDTO;
