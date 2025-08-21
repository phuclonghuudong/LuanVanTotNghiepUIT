class ProductDTO {
  constructor({
    product_id,
    category_product_id,
    brand_id,
    product_name,
    product_slug,
    product_sku,
    views,
    description,
    status,
    createdAt,
    updatedAt,
  }) {
    this.product_id = product_id;
    this.brand_id = brand_id;
    this.category_product_id = category_product_id;
    this.product_name = product_name;
    this.product_slug = product_slug;
    this.product_sku = product_sku;
    this.views = views;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.product_id,
      brandId: this.brand_id,
      categoryId: this.category_product_id,
      name: this.product_name,
      slug: this.product_slug,
      sku: this.product_sku,
      views: this.views,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = ProductDTO;
