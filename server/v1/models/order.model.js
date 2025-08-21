class OrderDTO {
  constructor({
    order_id,
    customer_id,
    promotion_id,
    shipping_id,
    payment_id,
    order_code, // Mã đơn hàng
    total_price, // Tổng tiền sau KM
    total_cost, // Tổng giá vốn tại thời điểm
    total_discount, // Tổng khuyến mãi
    coupon_code, // Mã giảm giá áp dụng
    shipping_fee, // Phí vận chuyển
    recipient_name, // Tên người nhận
    recipient_phone, // Số điện thoại người nhận
    shipping_address, // Địa chỉ nhận hàng
    note,
    status,
    createdAt,
    updatedAt,
  }) {
    this.order_id = order_id;
    this.customer_id = customer_id;
    this.promotion_id = promotion_id;
    this.shipping_id = shipping_id;
    this.payment_id = payment_id;
    this.order_code = order_code;
    this.total_price = total_price;
    this.total_cost = total_cost;
    this.total_discount = total_discount;
    this.coupon_code = coupon_code;
    this.shipping_fee = shipping_fee;
    this.recipient_name = recipient_name;
    this.recipient_phone = recipient_phone;
    this.shipping_address = shipping_address;
    this.note = note;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.order_id,
      customerId: this.customer_id,
      promotionId: this.promotion_id,
      shippingId: this.shipping_id,
      paymentId: this.payment_id,
      orderCode: this.order_code, // Mã đơn hàng
      totalPrice: this.total_price, // Tổng tiền sau KM
      totalCost: this.total_cost, // Tổng giá vốn tại thời điểm
      totalDiscount: this.total_discount, // Tổng khuyến mãi
      couponCode: this.coupon_code, // Mã giảm giá áp dụng
      shippingFee: this.shipping_fee, // Phí vận chuyển
      recipientName: this.recipient_name, // Tên người nhận
      recipientPhone: this.recipient_phone, // Số điện thoại người nhận
      shippingAddress: this.shipping_address, // Địa chỉ nhận hàng
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = OrderDTO;
