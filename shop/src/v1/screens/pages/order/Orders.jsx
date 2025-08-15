import React from "react";
import Title from "./../../../components/common/Title";
import ButtonComponent from "./../../../components/ui/ButtonComponent";

const Orders = () => {
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
      sizes: ["S", "M", "L"],
    },
    {
      name: "Casual Jeans",
      category: "Bottoms",
      price: 39.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4267B2", "#9CA3AF"],
      sizes: ["L", "M", "S"],
    },
    {
      name: "Casual Jeans",
      category: "Bottoms",
      price: 39.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4267B2", "#9CA3AF"],
      sizes: ["L", "M", "S"],
    },
    {
      name: "Basic T-shirt",
      category: "Tops",
      price: 19.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#FFFFFF", "#000000"],
      sizes: ["M", "S", "L"],
    },
    {
      name: "Casual Jeans",
      category: "Bottoms",
      price: 39.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4267B2", "#9CA3AF"],
      sizes: ["L", "M", "S"],
    },
    {
      name: "Casual Jeans",
      category: "Bottoms",
      price: 39.99,
      image: "https://placehold.co/300x300",
      hoverImage: "https://placehold.co/300x300/orange/white",
      colors: ["#4267B2", "#9CA3AF"],
      sizes: ["L", "M", "S"],
    },
  ];
  return (
    <div className="border-t pt-16 px-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gary-500">
                  <p className="text-lg">{item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p>
                  Date: <span className="text-gray-400">25,Jul,2024</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
              <ButtonComponent
                title="Theo dỗi đơn hàng"
                className="border px-4 py-2 text-sm font-medium"
                rounded="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
