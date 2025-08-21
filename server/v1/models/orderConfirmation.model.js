class OrderConfirmationDTO {
  constructor({
    confirmation_id,
    order_id,
    personnel_id,
    confirmed_at, // Thời gian xác nhận
    confirmed_status, // Thời gian xác nhận
    source, // Xác nhận
    note,
    status,
    createdAt,
    updatedAt,
  }) {
    this.confirmation_id = confirmation_id;
    this.order_id = order_id;
    this.personnel_id = personnel_id;
    this.confirmed_at = confirmed_at;
    this.confirmed_status = confirmed_status;
    this.source = source;
    this.note = note;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.confirmation_id,
      orderId: this.order_id,
      personnelId: this.personnel_id,
      confirmedAt: this.confirmed_at, // Thời gian xác nhận
      confirmedStatus: this.confirmed_status, // Thời gian xác nhận
      source: this.source, // Xác nhận
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = OrderConfirmationDTO;
