class PromotionDetailDTO {
  constructor({
    detail_id,
    promotion_id,
    variant_id,
    status,
    createdAt,
    updatedAt,
  }) {
    this.detail_id = detail_id;
    this.promotion_id = promotion_id;
    this.variant_id = variant_id;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.detail_id,
      promotionId: this.promotion_id,
      variantId: this.variant_id,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = PromotionDetailDTO;
