class PaymentDTO {
  constructor({
    payment_id,
    payment_method,
    payment_code,
    amount, // Số tiền thanh toán
    payment_status, // Trạng thái thanh toán
    payment_date, // Thời gian
    payment_detail, // Chi tiết phản hồi
    back_code,
    card_type,
    note,
    status,
    createdAt,
    updatedAt,
  }) {
    this.payment_id = payment_id;
    this.payment_method = payment_method;
    this.payment_code = payment_code;
    this.amount = amount;
    this.payment_status = payment_status;
    this.payment_date = payment_date;
    this.payment_detail = payment_detail;
    this.back_code = back_code;
    this.card_type = card_type;
    this.note = note;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.payment_id,
      paymentMethod: this.payment_method,
      paymentCode: this.payment_code,
      amount: this.amount, // Số tiền thanh toán
      paymentStatus: this.payment_status, // Trạng thái thanh toán
      paymentDate: this.payment_date, // Thời gian
      paymentDetail: this.payment_detail, // Chi tiết phản hồi
      backCode: this.back_code,
      cardType: this.card_type,
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = PaymentDTO;
