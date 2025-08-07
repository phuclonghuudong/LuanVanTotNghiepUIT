// import React, { useState } from "react";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import logo from "../../assets/logo/logo.svg";
import { FiHeart, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import IconComponent from "../../components/ui/IconComponent";
import { Link } from "react-router-dom";

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
const Navbar = ({ onCartClick }) => {
  // const [showMenu, setShowMenu] = useState(false);
  return <></>;
};

export default Navbar;
