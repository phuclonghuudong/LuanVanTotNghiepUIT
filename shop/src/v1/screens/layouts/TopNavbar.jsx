import React from "react";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="bg-black">
      <div className="container w-full max-w-7xl mx-auto  flex  items-center xl:justify-between justify-center min-h-[45px]  text-white">
        <div>
          <ul className="flex items-center justify-between gap-3">
            <Link>335-666-6688</Link>
            <Link>themesflat@gmail.com</Link>
            <Link className="underline">Our Store</Link>
          </ul>
        </div>
        <div className="hidden xl:block">
          <select name="" id="">
            <option value="">Việt Nam</option>
            <option value="">English</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
