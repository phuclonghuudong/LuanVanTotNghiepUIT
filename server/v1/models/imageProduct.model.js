class ImageProductDTO {
  constructor({
    img_id,
    product_id,
    image_url,
    is_main,
    status,
    createdAt,
    updatedAt,
  }) {
    this.img_id = img_id;
    this.product_id = product_id;
    this.image_url = image_url;
    this.is_main = is_main;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.img_id,
      productId: this.product_id,
      imageUrl: this.image_url,
      isMain: this.is_main,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = ImageProductDTO;
