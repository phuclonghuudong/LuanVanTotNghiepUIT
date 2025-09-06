class PurchaseOrderDetailDTO {
  constructor({
    pod_id,
    po_id,
    variant_id,
    quantity,
    price_import,
    unit,
    total_price,
    status,
    createdAt,
    updatedAt,
  }) {
    this.pod_id = pod_id;
    this.po_id = po_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
    this.price_import = price_import;
    this.unit = unit;
    this.total_price = total_price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.pod_id,
      purchaseOrderId: this.po_id,
      variantId: this.variant_id,
      quantity: this.quantity,
      priceImport: this.price_import,
      unit: this.unit,
      totalPrice: this.total_price,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = PurchaseOrderDetailDTO;
