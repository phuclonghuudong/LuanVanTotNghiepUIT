import React from "react";
import HeadingSection from "./HeadingSection";
import ProductGrid from "./products/ProductGrid";

const Seller = () => {
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
    {
      name: "Polarized sunglasses",
      category: "Accessories",
      price: 79.99,
      oldPrice: 98.0,
      sale: 19,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#000000", "#8C8C8C"],
    },
    {
      name: "Polarized sunglasses",
      category: "Accessories",
      price: 79.99,
      oldPrice: 98.0,
      sale: 21,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#000000", "#8C8C8C"],
    },
  ];

  return (
    <div data-aos="fade-up" className="mx-auto px-4 py-10">
      <div className="max-w-screen-xl mx-auto">
        <HeadingSection />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Seller;
