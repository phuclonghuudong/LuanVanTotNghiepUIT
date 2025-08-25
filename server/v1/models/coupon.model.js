class CouponDTO {
  constructor({
    coupon_id,
    promotion_id,
    code, // Mã code áp dụng
    max_uses, // Số lần sử dụng
    min_order_value, // Giá trị tối thiểu khi sử dụng
    used_count, // Số lượng đã sử dụng
    user_restriction, // Giới hạn người dùng
    expiry_date, // Hạn sử dụng mã
    usage_limit_per_customer, // Giới hạn sử dụng cho mõi khách hàng
    is_public, // Mã công khai hay chỉ private
    status,
    createdAt,
    updatedAt,
  }) {
    this.coupon_id = coupon_id;
    this.promotion_id = promotion_id;
    this.max_uses = max_uses;
    this.code = code;
    this.min_order_value = min_order_value;
    this.used_count = used_count;
    this.user_restriction = user_restriction;
    this.expiry_date = expiry_date;
    this.usage_limit_per_customer = usage_limit_per_customer;
    this.is_public = is_public;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.coupon_id,
      promotionId: this.promotion_id,
      code: this.code,
      maxUses: this.max_uses,
      minOrderValue: this.min_order_value,
      usedCount: this.used_count,
      userRestriction: this.user_restriction,
      expiryDate: this.expiry_date,
      usageLimitPerCustomer: this.usage_limit_per_customer,
      isPublic: this.is_public,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = CouponDTO;
