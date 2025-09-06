class CategoryProductDTO {
  constructor({
    category_product_id,
    category_id,
    category_product_name,
    category_product_slug,
    description,
    image_url,
    status,
    createdAt,
    updatedAt,
    product = [],
  }) {
    this.category_product_id = category_product_id;
    this.category_id = category_id;
    this.category_product_name = category_product_name;
    this.category_product_slug = category_product_slug;
    this.description = description;
    this.image_url = image_url;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.product = product;
  }

  toJSON() {
    return {
      id: this.category_product_id,
      categoryId: this.category_id,
      name: this.category_product_name,
      slug: this.category_product_slug,
      description: this.description,
      imageUrl: this.image_url,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
      product: this.product,
    };
  }
}

module.exports = CategoryProductDTO;
