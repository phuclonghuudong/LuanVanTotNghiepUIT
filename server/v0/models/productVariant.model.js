class ProductVariantDTO {
  constructor({
    variant_id,
    product_id,
    sku,
    description,
    avg_cost,
    price_sell, // Gia ban mac dinh
    price_original, // Gia goc khong giam
    is_default,
    status,
    createdAt,
    updatedAt,
  }) {
    this.variant_id = variant_id;
    this.product_id = product_id;
    this.sku = sku;
    this.description = description;
    this.avg_cost = avg_cost;
    this.price_sell = price_sell;
    this.price_original = price_original;
    this.is_default = is_default;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.variant_id,
      productId: this.product_id,
      sku: this.sku,
      description: this.description,
      avgCost: this.avg_cost,
      priceSell: this.price_sell,
      priceOriginal: this.price_original,
      isDefault: this.is_default,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ProductVariantDTO;
