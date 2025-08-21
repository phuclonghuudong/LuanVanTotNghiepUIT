class FavoriteProductDTO {
  constructor({
    favorite_id,
    product_id,
    customer_id,
    favorite_date,
    status,
    createdAt,
    updatedAt,
  }) {
    this.favorite_id = favorite_id;
    this.product_id = product_id;
    this.customer_id = customer_id;
    this.favorite_date = favorite_date;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.favorite_id,
      productId: this.product_id,
      customerId: this.customer_id,
      favoriteDate: this.favorite_date,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = FavoriteProductDTO;
