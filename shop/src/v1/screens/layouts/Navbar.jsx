import React from "react";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import logo from "../../assets/logo/logo.svg";
import { FiHeart, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import IconComponent from "../../components/ui/IconComponent";
import { Link, NavLink } from "react-router-dom";

const Menu = [
  {
    id: 1,
    name: "TRANG CHỦ",
    link: "/",
  },
  {
    id: 2,
    name: "SẢN PHẨM",
    link: "/products",
  },
  {
    id: 3,
    name: "BỘ SƯU TẬP",
    link: "/collection",
  },
  {
    id: 4,
    name: "GIỎ HÀNG",
    link: "/cart",
  },
  {
    id: 5,
    name: "GIỚI THIỆU",
    link: "/about",
  },
  {
    id: 6,
    name: "LIÊN HỆ",
    link: "/contact",
  },
];
const Navbar = ({ onCartClick, onMenuClick }) => {
  return (
    <header className="h-[70px] px-2">
      <div className="container w-full max-w-7xl h-full mx-auto ">
        <div className="flex items-center h-full">
          <div className="w-1/4 md:w-1/3 xl:hidden">
            <IoMenuOutline size={30} onClick={onMenuClick} />
          </div>
          <div className="md:w-1/3 w-1/2 xl:w-1/4 flex justify-center xl:justify-start">
            <Link to="/" className="justify-center">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>
          <div className="hidden xl:block xl:w-1/2">
            <ul className="flex items-center justify-between py-5 font-medium ">
              {Menu.map((data) => (
                <NavLink to={data.link} key={data.id} className="flex flex-col items-center gap-[2px]">
                  <p>{data.name}</p>
                  <hr className="w-3/4 border-none h-[1px] bg-gray-700 opacity-0 transition-all duration-400" />
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="xl:w-1/4 md:w-1/3 w-1/4">
            <div className="flex items-center gap-1 justify-end">
              <IconComponent icon={IoSearch} size={25} color="none" className="cursor-pointer" />
              <div className="relative group">
                <IconComponent icon={FiUser} size={25} color="none" className="hidden md:block cursor-pointer" />
                <div className="hidden md:block absolute top-[55px] md:-right-20 text-center p-5 bg-white rounded-lg shadow-lg z-20 w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  <Link
                    to="/auth/login"
                    className="block text-center py-2 font-medium bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    LOGIN
                  </Link>
                  <div className="text-sm text-center py-2 border-b">
                    Don’t have an account?{" "}
                    <Link to="/auth/register" className="font-medium hover:underline">
                      Register
                    </Link>
                  </div>
                  <div className="text-sm text-center py-2">Support</div>
                </div>
              </div>
              <IconComponent icon={FiHeart} size={25} color="none" className="hidden md:block cursor-pointer" />
              <div className="hidden sm:block cursor-pointer relative group" onClick={onCartClick}>
                <IconComponent icon={HiOutlineShoppingBag} size={25} color="none" className="cursor-pointer" />
                <span className="absolute top-2 right-1 rounded-full bg-red-500 w-4 h-4 md:text-base flex items-center text-white justify-center font-bold">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
