import React from "react";
import { Link } from "react-router";

const HeadingSection = () => {
  const tabs = [
    { label: "New Arrivals", path: "/products/new-arrivals", active: true },
    { label: "Best Seller", path: "/products/best-seller", active: false },
    { label: "On Sale", path: "/products/on-sale", active: false },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      <div className="flex gap-4 justify-center">
        {tabs.map((tab, index) => (
          <Link
            to={tab.path}
            key={index}
            className={`text-xl sm:text-3xl md:text-4xl font-medium  ${
              tab.active === true ? "text-black underline" : "text-gray-600"
            }  hover:underline  transition-all duration-400 hover:text-black`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeadingSection;
