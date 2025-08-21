class ReturnOrderDTO {
  constructor({
    return_id,
    order_id,
    customer_id,
    warehouse_id,
    total_refund,
    return_reason,
    note,
    status,
    createdAt,
    updatedAt,
  }) {
    this.return_id = return_id;
    this.order_id = order_id;
    this.customer_id = customer_id;
    this.warehouse_id = warehouse_id;
    this.total_refund = total_refund;
    this.return_reason = return_reason;
    this.note = note;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.return_id,
      orderId: this.order_id,
      customerId: this.customer_id,
      warehouseId: this.warehouse_id,
      totalRefund: this.total_refund,
      returnReason: this.return_reason,
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ReturnOrderDTO;
