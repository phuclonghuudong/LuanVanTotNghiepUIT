import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import ImageGalleryComponent from "./../../../components/common/products/ImageGalleryComponent";
import ProductInfoComponent from "../../../components/common/products/ProductInfoComponent";
import img1 from "../../../assets/products/women-2.jpg";
import img2 from "../../../assets/products/women-3.jpg";
import img3 from "../../../assets/products/women-4.jpg";
import img4 from "../../../assets/products/women-5.jpg";

const ProductDetail = () => {
  const images = [img1, img2, img3, img4];
  const product = {
    name: "Stretch Strap Top",
    category: "Clothing",
    price: 79.99,
    originalPrice: 98.99,
    discount: "-25%",
    description: "The garments are made with sustainable materials...",
    colors: ["gray", "beige", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5,
    reviews: 134,
  };
  return (
    <div data-aos="fade-up" className=" bg-white">
      <PageTitle
        withBackground={false}
        breadcrumbAlign="left"
        breadcrumb={[{ label: "Homepage", href: "/" }, { label: "Women" }, { label: "Leather boots with tall leg" }]}
      />
      <section className="max-w-screen-xl mx-auto px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Gallery */}
        <div className="w-full h-full">
          <ImageGalleryComponent images={images} />
        </div>

        {/* Info */}
        <div className="w-full h-full">
          <ProductInfoComponent product={product} />
        </div>
      </section>

      {/* <ProductStickyBar product={product} /> */}
    </div>
  );
};

export default ProductDetail;
