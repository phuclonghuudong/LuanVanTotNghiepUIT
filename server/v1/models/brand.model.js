class BrandDTO {
  constructor({
    brand_id,
    brand_name,
    brand_slug,
    description,
    image_url,
    status,
    createdAt,
    updatedAt,
    products = [],
  }) {
    this.brand_id = brand_id;
    this.brand_name = brand_name;
    this.brand_slug = brand_slug;
    this.description = description;
    this.image_url = image_url;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.products = products;
  }

  toJSON() {
    return {
      id: this.brand_id,
      name: this.brand_name,
      slug: this.brand_slug,
      description: this.description,
      imageUrl: this.image_url,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      products: this.products,
    };
  }
}

module.exports = BrandDTO;
