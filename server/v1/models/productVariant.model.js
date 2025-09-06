const ColorDTO = require("./color.model");
const SizeDTO = require("./size.model");

class ProductVariantDTO {
  constructor({
    variant_id,
    product_id,
    name,
    sku,
    description,
    avg_cost,
    price_sell, // Gia ban mac dinh
    price_original, // Gia goc khong giam
    is_default,
    status,
    createdAt,
    updatedAt,
    color = null,
    size = null,
  }) {
    this.variant_id = variant_id;
    this.product_id = product_id;
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.avg_cost = avg_cost ? Number(avg_cost) : 0;
    this.price_sell = price_sell ? Number(price_sell) : 0;
    this.price_original = price_original ? Number(price_original) : 0;
    this.is_default = is_default;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.color = color ? new ColorDTO(color) : null;
    this.size = size ? new SizeDTO(size) : null;
  }

  toJSON() {
    return {
      id: this.variant_id,
      productId: this.product_id,
      name: this.name,
      sku: this.sku,
      description: this.description,
      avgCost: this.avg_cost,
      priceSell: this.price_sell,
      priceOriginal: this.price_original,
      isDefault: this.is_default,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      color: this.color ? this.color.toJSON() : null,
      size: this.size ? this.size.toJSON() : null,
    };
  }
}

module.exports = ProductVariantDTO;
