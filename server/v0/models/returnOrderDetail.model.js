class ReturnOrderDetailDTO {
  constructor({
    return_detail_id,
    return_id,
    variant_id,
    quantity,
    unit,
    refund_price,
    restock,
    status,
    createdAt,
    updatedAt,
  }) {
    this.return_detail_id = return_detail_id;
    this.return_id = return_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
    this.unit = unit;
    this.refund_price = refund_price;
    this.restock = restock;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.return_detail_id,
      returnId: this.return_id,
      variantId: this.variant_id,
      quantity: this.quantity,
      unit: this.unit,
      refundPrice: this.refund_price,
      restock: this.restock,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ReturnOrderDetailDTO;
