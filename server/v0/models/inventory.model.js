class InventoryDTO {
  constructor({
    inventory_id,
    warehouse_id,
    variant_id,
    quantity,
    avg_cost,
    last_import_price, // Giá nhập mới nhất
    status,
    createdAt,
    updatedAt,
  }) {
    this.inventory_id = inventory_id;
    this.warehouse_id = warehouse_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
    this.avg_cost = avg_cost;
    this.last_import_price = last_import_price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.inventory_id,
      warehouseId: this.warehouse_id,
      variantId: this.variant_id,
      quantity: this.quantity,
      avgCost: this.avg_cost,
      lastImportPrice: this.last_import_price, // Giá nhập mới nhất
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = InventoryDTO;
