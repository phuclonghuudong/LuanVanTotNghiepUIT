import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import Title from "../../../components/common/Title";
import IconComponent from "../../../components/ui/IconComponent";
import { CiSquareRemove } from "react-icons/ci";
import CartTotal from "../../../components/common/cart/CartTotal";

const Cart = () => {
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
  ];
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className="border-t pt-10 px-10 mx-auto">
        <div className="text-2xl mb-3">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>
        <div>
          {products.map((item, index) => {
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_1fr_0.5fr] md:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex sm:items-start gap-6">
                  <img className="w-16 sm:w-20" src={item.image} alt="" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>${item.price}</p>
                      <p className="px-2  sm:px-2 sm:py-1 border bg-slate-50">{item.sizes[0]}</p>
                    </div>
                  </div>
                </div>
                <input
                  className="border max-w-10 md:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={quantity}
                />
                <Link className="">
                  <IconComponent icon={CiSquareRemove} size={24} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-14">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <Link to="/place-order">
                <ButtonComponent
                  title="THANH TOÁN"
                  color="black"
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                  onClick={() => Navigate("/place-order")}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
