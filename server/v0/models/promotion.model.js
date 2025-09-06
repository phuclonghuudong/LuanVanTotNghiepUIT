class PromotionDTO {
  constructor({
    promotion_id,
    promotion_name,
    promotion_slug,
    description,
    start_date,
    end_date,
    is_active,
    priority,
    promotion_type,
    status,
    createdAt,
    updatedAt,
  }) {
    this.promotion_id = promotion_id;
    this.promotion_name = promotion_name;
    this.promotion_slug = promotion_slug;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_active = is_active;
    this.priority = priority;
    this.promotion_type = promotion_type;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.promotion_id,
      name: this.promotion_name,
      slug: this.promotion_slug,
      description: this.description,
      startDate: this.start_date,
      endDate: this.end_date,
      isActive: this.is_active,
      priority: this.priority,
      type: this.promotion_type,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = PromotionDTO;
