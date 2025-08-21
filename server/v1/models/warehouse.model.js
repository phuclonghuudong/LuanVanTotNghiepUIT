class WarehouseDTO {
  constructor({
    warehouse_id,
    warehouse_name,
    address,
    description,
    status,
    createdAt,
    updatedAt,
  }) {
    this.warehouse_id = warehouse_id;
    this.warehouse_name = warehouse_name;
    this.address = address;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.warehouse_id,
      name: this.warehouse_name,
      address: this.address,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = WarehouseDTO;
