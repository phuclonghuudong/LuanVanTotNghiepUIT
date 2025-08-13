import React, { useEffect } from "react";
import logo from "../../assets/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import IconComponent from "./../ui/IconComponent";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import ButtonComponent from "./../ui/ButtonComponent";
import { FiHeart, FiPhone, FiUser } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { MdArrowOutward, MdOutlineMail } from "react-icons/md";
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
const MenuScreenMobile = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup khi component bị hủy
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] w-full h-full flex items-start justify-start">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`absolute top-0 bottom-0 overflow-hidden max-h-full bg-white transition-all z-10 ${
          isOpen ? "w-sm" : "w-0"
        } overflow-y-auto`}
      >
        <div className="flex flex-col text-gray-600 p-3 ">
          <div onClick={onClose} className="flex items-center gap-4">
            <IconComponent icon={TfiClose} />
          </div>
          <div className="mt-3">
            <div>
              <div className="flex items-center h-10 border rounded-sm px-3">
                <IconComponent icon={CiSearch} className="" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full  outline-none placeholder:text-gray-400 text-sm "
                />
              </div>
              <div className="mt-4">
                {Menu.map((data) => (
                  <div key={data?.id} className=" mt-2 border-b border-gray-300  h-10 text-center">
                    <NavLink to={data?.link} onClick={onClose} className="flex  items-center  justify-between gap-1">
                      <p>{data?.name}</p>
                      <IconComponent icon={IoAddOutline} />
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-4 gap-2">
              <Link to="/wishlist" onClick={onClose}>
                <ButtonComponent icon={FiHeart} title="Wishlist" rounded="sm" />
              </Link>
              <Link to="auth/login">
                <ButtonComponent icon={FiUser} title="Login" rounded="sm" />
              </Link>
            </div>
            <div className="footer mt-4">
              <div className="footer-logo mb-4">
                <Link to="/">
                  <img src={logo} alt="" className="object-contain" />
                </Link>
              </div>
              <div className="footer-address mb-4">
                <p>549 Oak St.Crystal Lake, IL 60014</p>

                <Link to="/" className="flex gap-2 mt-2 items-center text-[15px]">
                  GET DIRECTION <IconComponent icon={MdArrowOutward} />
                </Link>
              </div>
              <div className="footer-info">
                <Link className="flex items-center gap-2">
                  <IconComponent icon={MdOutlineMail} />
                  <p>themesflat@gmail.com</p>
                </Link>
                <Link className="flex items-center gap-2">
                  <IconComponent icon={FiPhone} />
                  <p>315-666-6688</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreenMobile;
