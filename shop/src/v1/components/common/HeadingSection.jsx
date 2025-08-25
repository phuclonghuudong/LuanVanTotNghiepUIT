import React from "react";
import {Link} from "react-router";

const HeadingSection = () => {
  const tabs = [
    {label: "New Arrivals", path: "/products/new-arrivals", active: true},
    {label: "Best Seller", path: "/products/best-seller", active: false},
    {label: "On Sale", path: "/products/on-sale", active: false},
  ];
  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      <div className="flex gap-4 justify-center">
        {tabs.map((tab, index) => (
          <Link
            to={tab.path}
            key={index}
            className={`relative group text-xl sm:text-3xl md:text-4xl font-medium  transition-all duration-400 `}
          >
            {tab.label}
            <span
              className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300  ${
                tab.active === true ? "w-full" : "group-hover:w-full"
              }`}
            ></span>
            <hr className="w-3/4 border-none h-[2px] bg-gray-700 opacity-0 transition-all duration-400" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeadingSection;
