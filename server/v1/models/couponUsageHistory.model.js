class CouponUsageHistoryDTO {
  constructor({
    history_id,
    coupon_id,
    customer_id,
    order_id,
    used_at, // Số lần sử dụng
    discount_value, // Giá trị giảm giá đã dùng
    status,
    createdAt,
    updatedAt,
  }) {
    this.history_id = history_id;
    this.coupon_id = coupon_id;
    this.customer_id = customer_id;
    this.order_id = order_id;
    this.used_at = used_at;
    this.discount_value = discount_value;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.history_id,
      couponId: this.coupon_id,
      customerId: this.customer_id,
      orderId: this.order_id,
      usedAt: this.used_at,
      discountValue: this.discount_value,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = CouponUsageHistoryDTO;
