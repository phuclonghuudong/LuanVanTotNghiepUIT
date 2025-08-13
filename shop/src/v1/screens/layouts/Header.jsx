// import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import Navbar from "./Navbar";

const Menu = [
  {
    id: 1,
    name: "Trang chủ",
    link: "/",
  },
  {
    id: 2,
    name: "Sản phẩm",
    link: "/products",
  },
];
const Header = ({ onCartClick, onMenuClick }) => {
  return (
    <>
      <TopNavbar />
      <Navbar onCartClick={onCartClick} onMenuClick={onMenuClick} />
    </>
  );
};

export default Header;
