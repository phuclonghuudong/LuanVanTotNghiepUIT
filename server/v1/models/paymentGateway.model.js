class PaymentGatewayDTO {
  constructor({
    gateway_id,
    gateway_name, // "VNPay", "Momo", "PayPal"
    gateway_code, // Mã định danh hệ thống dùng để mapping nội bộ (VD: "VNPAY", "MOMO", "PAYPAL")
    merchant_id, // ID định danh tài khoản merchant khi đăng ký với bên thứ 3 (cung cấp bởi gateway)
    merchant_key, // Khóa bí mật (secret key) do cổng thanh toán cung cấp cho merchant để ký và xác thực dữ liệu khi gọi API
    config, // Cấu hình bổ sung cho gateway
    is_active,
    fee_percentage, // Phí tính theo phần trăm mỗi giao dịch.
    fee_fixed, // Phí cố định cho mỗi giao dịch
    description,
    note,
    status,
    createdAt,
    updatedAt,
  }) {
    this.gateway_id = gateway_id;
    this.gateway_name = gateway_name;
    this.gateway_code = gateway_code;
    this.merchant_id = merchant_id;
    this.merchant_key = merchant_key;
    this.config = config;
    this.is_active = is_active;
    this.fee_percentage = fee_percentage;
    this.fee_fixed = fee_fixed;
    this.description = description;
    this.note = note;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.gateway_id,
      name: this.gateway_name,
      code: this.gateway_code,
      merchantId: this.merchant_id,
      merchantKey: this.merchant_key,
      config: this.config,
      isActive: this.is_active,
      feePercentage: this.fee_percentage,
      feeFixed: this.fee_fixed,
      description: this.description,
      note: this.note,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = PaymentGatewayDTO;
