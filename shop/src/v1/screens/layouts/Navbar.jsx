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
const Navbar = () => {
  // const [showMenu, setShowMenu] = useState(false);
  return (
    <header className='h-[70px]'>
      <div className='container w-full max-w-7xl h-full mx-auto '>
        <div className='flex items-center h-full'>
          <div className='w-1/4 md:w-1/3 xl:hidden'>
            <a href='#'>
              <IoMenuOutline fontSize={"30px"} />
            </a>
          </div>
          <div className='md:w-1/3 w-1/2 xl:w-1/4 flex justify-center xl:justify-start'>
            <a href='index.html' className='justify-center'>
              <img src={logo} alt='logo' className='logo' />
            </a>
          </div>
          <div className='hidden xl:block xl:w-1/2'>
            <nav>
              <ul className='flex items-center gap-5 justify-center'>
                {Menu.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className='inline-block hover:text-red-700 hover:text-semibold hover:text-xl text-xl font-semibold duration-200'
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className='xl:w-1/4 md:w-1/3 w-1/4'>
            <div className='flex items-center gap-1 justify-end'>
              <IconComponent icon={IoSearch} size={25} color='none' className='cursor-pointer' />
              <div className='relative group'>
                <IconComponent icon={FiUser} size={25} color='none' className='hidden md:block cursor-pointer' />
                <div className='absolute top-[55px] -right-28 text-center p-5 bg-white rounded-lg shadow-lg z-20 w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                  <Link
                    to='/auth/login'
                    className='block text-center py-2 font-medium bg-black text-white rounded-lg hover:bg-gray-800'
                  >
                    LOGIN
                  </Link>
                  <div className='text-sm text-center py-2 border-b'>
                    Don’t have an account?{" "}
                    <Link to='/auth/register' className='font-medium hover:underline'>
                      Register
                    </Link>
                  </div>
                  <div className='text-sm text-center py-2'>Support</div>
                </div>
              </div>
              <IconComponent icon={FiHeart} size={25} color='none' className='hidden md:block cursor-pointer' />
              <IconComponent
                icon={HiOutlineShoppingBag}
                size={25}
                color='none'
                className='hidden md:block cursor-pointer'
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
