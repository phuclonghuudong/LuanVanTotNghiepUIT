// import { useState } from "react";
// import ProductGrid from "./ProductGrid";
// import Pagination from "./Pagination";
import ShopControl from "../../../components/common/ShopControl";
import ProductGrid from "../../../components/common/products/ProductGrid";
import PageTitle from "./../../../components/common/PageTitle";

const ProductPage = () => {
  //   const [layout, setLayout] = useState("grid");
  //   const [sort, setSort] = useState("best-selling");
  const products = [
    {
      name: "Polarized sunglasses",
      category: "Accessories",
      price: 79.99,
      oldPrice: 98.0,
      sale: 25,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#000000", "#8C8C8C"],
    },
    {
      name: "Basic T-shirt",
      category: "Tops",
      price: 19.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#FFFFFF", "#000000"],
    },
    {
      name: "Casual Jeans",
      category: "Bottoms",
      price: 39.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4267B2", "#9CA3AF"],
    },
    {
      name: "Sneakers",
      category: "Footwear",
      price: 59.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4B5563", "#9CA3AF"],
    },
    {
      name: "Hoodie Jacket",
      category: "Outerwear",
      price: 49.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#FFB6C1", "#FFD700"],
    },
    {
      name: "Summer Dress",
      category: "Dresses",
      price: 29.99,
      sale: 20,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4B5563", "#9CA3AF"],
    },
  ];
  return (
    <>
      <PageTitle
        title="Women"
        withBackground={true}
        breadcrumbAlign="center"
        breadcrumb={[{ label: "Homepage", href: "/" }, { label: "Women" }]}
      />

      <section className="py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <ShopControl />
          <ProductGrid products={products} />
          {/* 
          <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} /> */}
        </div>
      </section>
    </>
  );
};

export default ProductPage;
