import React from "react";
import IconComponent from "./../ui/IconComponent";
import { RiExchangeFundsFill } from "react-icons/ri";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
const OurPolicy = () => {
  return (
    <div
      data-aos="fade-up"
      className=" px-32 flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-16 text-xs sm:text-sm md:text-base text-gray-700"
    >
      <div className="">
        <IconComponent icon={RiExchangeFundsFill} className="m-auto mb-5" size={48} />
        <p className="font-semibold">Easy Exchange Plicy</p>
        <p className="text-gray-700">We offer hassle free exchange policy</p>
      </div>
      <div className="">
        <IconComponent icon={BsFillPatchCheckFill} className="m-auto mb-5" size={48} />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-700">We provide 7 days free return policy</p>
      </div>
      <div className="">
        <IconComponent icon={BiSupport} className="m-auto mb-5" size={48} />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-700">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
