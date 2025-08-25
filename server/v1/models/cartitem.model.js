class CartItemDTO {
  constructor({
    item_id,
    cart_id,
    variant_id,
    quantity,
    price_at_time,
    promotion_price,
    is_active,
    status,
    createdAt,
    updatedAt,
  }) {
    this.item_id = item_id;
    this.cart_id = cart_id;
    this.variant_id = variant_id;
    this.quantity = quantity;
    this.price_at_time = price_at_time;
    this.promotion_price = promotion_price;
    this.is_active = is_active;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.item_id,
      cartId: this.cart_id,
      variantId: this.variant_id,
      quantity: this.quantity,
      priceAtTime: this.price_at_time,
      promotionPrice: this.promotion_price,
      isActive: this.is_active,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = CartItemDTO;
