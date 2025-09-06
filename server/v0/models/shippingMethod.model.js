class ShippingMethodDTO {
  constructor({
    shipping_id,
    shipping_code, // Mã định danh
    shipping_name, // Mô tả chi tiết
    description,
    fee_type, // Cách tính phí
    carrier, // Đơn vị vận chuyển
    is_active,
    delivery_time, // Thời gian giao hàng
    base_fee, // Phí cơ bản
    free_threshold, // Miễn phí từ giá trị này
    status,
    createdAt,
    updatedAt,
  }) {
    this.shipping_id = shipping_id;
    this.shipping_code = shipping_code;
    this.shipping_name = shipping_name;
    this.description = description;
    this.fee_type = fee_type;
    this.carrier = carrier;
    this.is_active = is_active;
    this.delivery_time = delivery_time;
    this.base_fee = base_fee;
    this.free_threshold = free_threshold;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.shipping_id,
      code: this.shipping_code, // Mã định danh
      name: this.shipping_name, // Mô tả chi tiết
      description: this.description,
      feeType: this.fee_type, // Cách tính phí
      carrier: this.carrier, // Đơn vị vận chuyển
      isActive: this.is_active,
      deliveryTime: this.delivery_time, // Thời gian giao hàng
      baseFee: this.base_fee, // Phí cơ bản
      freeThreshold: this.free_threshold, // Miễn phí từ giá trị này
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ShippingMethodDTO;
