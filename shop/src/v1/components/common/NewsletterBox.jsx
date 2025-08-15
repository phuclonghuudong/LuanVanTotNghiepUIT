import React from "react";
import ButtonComponent from "../ui/ButtonComponent";
import { MdArrowOutward } from "react-icons/md";

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div data-aos="fade-up" className="text-center">
      <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, repudiandae? Perferendis, dignissimos.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border p-[1px] pl-5 rounded-full"
      >
        <input type="email" className="w-full sm:flex-1 outline-none" name="email" placeholder="Enter your email" />

        <ButtonComponent title="SUBSCRIBE" size={30} color="black" className=" cursor-pointer duration-700" />
      </form>
    </div>
  );
};

export default NewsletterBox;
