class OrderDetailDTO {
  constructor({
    order_detail_id,
    order_id,
    variant_id,
    quantity,
    price_sell, // Giá trước khuyến mãi
    discount, // Tổng giảm giá
    final_price, // Tổng giảm giá x số lượng
    cost_price, // Giá vốn tại thời điểm bán
    status,
    createdAt,
    updatedAt,
  }) {
    this.order_detail_id = order_detail_id;
    this.order_id = order_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
    this.price_sell = price_sell;
    this.discount = discount;
    this.final_price = final_price;
    this.cost_price = cost_price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.order_detail_id,
      orderId: this.order_id,
      variant: this.variant_id,
      quantity: this.quantity,
      priceSell: this.price_sell, // Giá trước khuyến mãi
      discount: this.discount, // Tổng giảm giá
      finalPrice: this.final_price, // Tổng giảm giá x số lượng
      costPrice: this.cost_price, // Giá vốn tại thời điểm bán
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = OrderDetailDTO;
