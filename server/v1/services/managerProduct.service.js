const ProductBUS = require("./product.service");
const ColorBUS = require("./color.service");
const SizeBUS = require("./size.service");
const ProductVariantBUS = require("./productVariant.service");
const BrandBUS = require("./brand.service");
const CategoryProductBUS = require("./categoryProduct.service");

class ManagerProductBUS {
  async productInformation(data) {
    if (!Array.isArray(data)) return [];

    console.log(data);
    const payload = data.map((x) => {
      return {
        id: x.id,
        name: x.name,
        slug: x.slug,
        sku: x.sku,
        views: x.views,
        description: x.description,
        status: x.status,
        brand: x.brand.name,
        category: x.categoryProduct.name,
        image: x.image || [],
        variant: x.variant,
      };
    });
    return payload;
  }
  async getAllProduct() {
    const productData = await ProductBUS.getAllProduct();

    const result = await this.productInformation(productData);

    return productData;
  }
}

module.exports = new ManagerProductBUS();
