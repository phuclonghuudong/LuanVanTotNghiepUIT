class ProductReviewDTO {
  constructor({
    review_id,
    product_id,
    rating,
    content,
    status,
    createdAt,
    updatedAt,
  }) {
    this.review_id = review_id;
    this.product_id = product_id;
    this.customer_id = customer_id;
    this.rating = rating;
    this.content = content;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.review_id,
      productId: this.product_id,
      customerId: this.customer_id,
      rating: this.rating,
      content: this.content,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ProductReviewDTO;
