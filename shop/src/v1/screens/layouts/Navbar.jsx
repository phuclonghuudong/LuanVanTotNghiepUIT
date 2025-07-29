import React from 'react'
import { IoMenuOutline, IoSearch } from 'react-icons/io5';
import logo from '../../assets/logo/logo.svg';
import { FiHeart, FiUser } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
const Menu= [
  {
  id:1,
  name:'Trang chủ',
  link:"/"
  },
  {
  id:2,
  name:'Sản phẩm',
  link:"/products"
  },
  
]
const Navbar = () => {
  return (
    <header className='h-[70px] px-[10px]'>
      <div className='container h-full mx-auto xl:px-[50px] '>
        <div className='flex items-center h-full'>
          <div className='w-1/4 md:w-1/3 xl:hidden'>
            <a href="#">
              <IoMenuOutline fontSize={'30px'} />
            </a>
          </div>
          <div className="md:w-1/3 w-1/2 xl:w-1/4 flex justify-center xl:justify-start"> 
              <a href="index.html" className="justify-center">
                  <img src={logo} alt="logo" className="logo"/>
              </a>
          </div>
          <div className="hidden xl:block xl:w-1/2">
              <nav>
                <ul className='flex items-center gap-5 justify-center'>
                  {
                  Menu.map((data)=>(
                    <li key={data.id}>
                      <a 
                      href={data.link}
                      className='inline-block hover:text-red-700 hover:text-semibold hover:text-xl text-xl font-semibold duration-200'
                      >{data.name}</a>
                    </li>
                  ))}
                </ul>
              </nav>
          </div>
          <div className="xl:w-1/4 md:w-1/3 w-1/4">
            <ul className='flex items-center gap-4 justify-end'>
              <li>
                <a href="#"><IoSearch fontSize={'25px'}/></a>
              </li>
              <li className='hidden md:block'>
                <a href="#" ><FiUser fontSize={'25px'}/></a>
              </li>
              <li className='hidden md:block'>
                <a href="#"><FiHeart fontSize={'25px'}/></a>
              </li>
              <li>
                <a href="#"><HiOutlineShoppingBag fontSize={'25px'}/></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar