class CartDTO {
  constructor({
    cart_id,
    customer_id,
    total_price,
    total_cost,
    total_discount,
    coupon_code,
    note,
    status,
    createdAt,
    updatedAt,
  }) {
    this.cart_id = cart_id;
    this.customer_id = customer_id;
    this.total_price = total_price;
    this.total_cost = total_cost;
    this.total_discount = total_discount;
    this.coupon_code = coupon_code;
    this.note = note;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.cart_id,
      customerId: this.customer_id,
      totalPrice: this.total_price,
      totalCost: this.total_cost,
      totalDiscount: this.total_discount,
      couponCode: this.coupon_code,
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = CartDTO;
