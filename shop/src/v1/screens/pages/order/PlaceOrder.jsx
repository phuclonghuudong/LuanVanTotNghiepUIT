import React, { useState } from "react";
import Title from "./../../../components/common/Title";
import CartTotal from "./../../../components/common/cart/CartTotal";
import { Link, Navigate } from "react-router-dom";
import ButtonComponent from "../../../components/ui/ButtonComponent";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-10">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-1/2">
        <div className="text-xl md:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="StaCte" />
        </div>
        <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>
      {/* Right side */}
      <div className="mt-8 w-full sm:max-w-1/2">
        <div className="md:mt-8 mt-0">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("zalopay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "zalopay" ? "bg-green-400" : ""}`}></p>
              <p>ZaloPay</p>
              <img className="h-5 mx-4" src="" alt="" />
            </div>
            <div onClick={() => setMethod("momo")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "momo" ? "bg-green-400" : ""}`}></p>
              <p>MOMO</p>
              <img className="h-5 mx-4" src="" alt="" />
            </div>
            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">Thanh toán tiền mặt</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <Link to="/orders">
              <ButtonComponent
                title="ĐẶT HÀNG"
                color="black"
                className="bg-black text-white text-sm px-16 py-3 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
