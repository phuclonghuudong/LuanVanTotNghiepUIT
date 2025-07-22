import { FiHeart, FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMenuOutline, IoSearch } from "react-icons/io5";
import logo from "../../../../public/logo.svg";

const Navbar = () => {
  return (
    <header className="h-[83px]">
      <div className="container h-full mx-auto xl:px-[50px] ">
        <div className="flex items-center h-full">
          <div className="w-1/4 md:w-1/3 xl:hidden">
            <a href="#">
              <IoMenuOutline fontSize={"30px"} />
            </a>
          </div>
          <div class="md:w-1/3 w-1/2 xl:w-1/4 flex justify-center xl:justify-start">
            <a href="index.html" className="justify-center">
              <img src={logo} alt="logo" class="logo" />
            </a>
          </div>
          <div class="hidden xl:block xl:w-1/2">
            <nav>
              <ul className="flex items-center gap-5 justify-center ">
                <li>
                  <a href="#" className="text-xl font-semibold">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xl font-semibold">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xl font-semibold">
                    Loại sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xl font-semibold">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xl font-semibold">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="xl:w-1/4 md:w-1/3 w-1/4">
            <ul className="flex items-center gap-4 justify-end">
              <li>
                <a href="#">
                  <IoSearch fontSize={"25px"} />
                </a>
              </li>
              <li className="hidden md:block">
                <a href="#">
                  <FiUser fontSize={"25px"} />
                </a>
              </li>
              <li className="hidden md:block">
                <a href="#">
                  <FiHeart fontSize={"25px"} />
                </a>
              </li>
              <li>
                <a href="#">
                  <HiOutlineShoppingBag fontSize={"25px"} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
