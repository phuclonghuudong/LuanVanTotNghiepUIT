class PromotionActionDTO {
  constructor({
    action_id,
    promotion_id,
    action_type,
    action_value,
    status,
    createdAt,
    updatedAt,
  }) {
    this.action_id = action_id;
    this.promotion_id = promotion_id;
    this.action_type = action_type;
    this.action_value = action_value;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.action_id,
      promotionId: this.promotion_id,
      type: this.action_type,
      value: this.action_value,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = PromotionActionDTO;
