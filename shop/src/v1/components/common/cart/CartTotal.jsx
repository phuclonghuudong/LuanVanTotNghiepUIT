import React from "react";
import Title from "./../Title";

const CartTotal = () => {
  return (
    <div className="w-full">
      <div className="md:text-2xl text-xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-3 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>vnđ</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>vnđ</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>vnđ</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
