class PromotionRuleDTO {
  constructor({
    rule_id,
    promotion_id,
    rule_type,
    condition_value,
    status,
    createdAt,
    updatedAt,
  }) {
    this.rule_id = rule_id;
    this.promotion_id = promotion_id;
    this.rule_type = rule_type;
    this.condition_value = condition_value;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.rule_id,
      promotionId: this.promotion_id,
      ruleType: this.rule_type,
      conditionValue: this.condition_value,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = PromotionRuleDTO;
