const BrandDTO = require("./brand.model");
const ProductVariantDTO = require("./productVariant.model");
const CategoryProductDTO = require("./categoryProduct.model");

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
    imgProduct = null,
    productVariant = null,
    brand = null,
    categoryProduct = null,
    // productComment = null,
    // productReview = null,
    // favorite = null,
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

    this.images = imgProduct
      ? imgProduct
          .map((img) => img.status === 1 && img.image_url)
          .filter((url) => url && url.trim() !== "")
      : null;

    this.brand = brand ? new BrandDTO(brand) : null;
    this.categoryProduct = categoryProduct
      ? new CategoryProductDTO(categoryProduct)
      : null;

    this.productVariant = productVariant
      ? productVariant.map((x) => new ProductVariantDTO(x))
      : [];
    // this.productComment = productComment;
    // this.productReview = productReview;
    // this.favorite = favorite;
  }

  toJSON() {
    return {
      id: this.product_id,
      brandId: this.brand_id,
      categoryProductId: this.category_product_id,
      name: this.product_name,
      slug: this.product_slug,
      sku: this.product_sku,
      views: this.views,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      image: this.images,
      // imageProduct: this.imgProduct,

      brand: this.brand ? this.brand.toJSON() : null,
      categoryProduct: this.categoryProduct
        ? this.categoryProduct.toJSON()
        : null,

      variant: this.productVariant.map((pv) => pv.toJSON()),
      // productComment: this.productComment,
      // productReview: this.productReview,
      // favorite: this.favorite,
    };
  }
}

module.exports = ProductDTO;
