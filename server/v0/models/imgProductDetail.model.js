class ImgProductDetailDTO {
  constructor({
    img_id,
    variant_id,
    image_url,
    is_main,
    status,
    createdAt,
    updatedAt,
  }) {
    this.img_id = img_id;
    this.variant_id = variant_id;
    this.image_url = image_url;
    this.is_main = is_main;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.img_id,
      variantId: this.variant_id,
      imageUrl: this.image_url,
      isMain: this.is_main,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.createdAt,
    };
  }
}

module.exports = ImgProductDetailDTO;
