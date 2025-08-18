import React from "react";
import logo from "../../assets/logo/logo.svg";
import { MdArrowOutward, MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaAmazon, FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import IconComponent from "./../../components/ui/IconComponent";
import ButtonComponent from "./../../components/ui/ButtonComponent";

const Footer = () => {
  return (
    <div data-aos="fade-up" className="border-t border-t-gray-300">
      <div className="w-full max-w-7xl mx-auto my-[82px]">
        <div className="footer-body">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              {/*  Cột 1  */}
              <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="footer-infor">
                  <div className="footer-logo mb-4">
                    <Link to="/">
                      <img src={logo} alt="" className="object-contain" />
                    </Link>
                  </div>
                  <div className="footer-address mb-4">
                    <p>549 Oak St.Crystal Lake, IL 60014</p>

                    <Link className="flex gap-2 mt-2 items-center text-[15px]">
                      GET DIRECTION <MdArrowOutward size={"23px"} />
                    </Link>
                  </div>
                  <ul className="footer-info space-y-2">
                    <Link className="flex items-center gap-2">
                      <IconComponent icon={MdOutlineMail} />
                      <p>themesflat@gmail.com</p>
                    </Link>
                    <Link className="flex items-center gap-2">
                      <IconComponent icon={FiPhone} />
                      <p>315-666-6688</p>
                    </Link>
                  </ul>
                  <div className="tf-social-icon flex flex-wrap gap-2 mt-4">
                    <Link className="w-8  h-8 border  rounded-full flex items-center justify-center hover:text-white hover:bg-[#1877F2] transition-colors duration-300">
                      <FaFacebookF />
                    </Link>
                    <Link className="w-8  h-8 border  rounded-full flex items-center justify-center hover:text-white transition-colors duration-300 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600">
                      <FaInstagram />
                    </Link>
                    <Link className="w-8  h-8 border  rounded-full flex items-center justify-center hover:text-white transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#25F4EE] hover:via-black hover:to-[#FE2C55] hover:shadow-lg hover:scale-110">
                      <FaTiktok />
                    </Link>
                    <Link className="w-8  h-8 border  rounded-full flex items-center justify-center hover:text-white transition-colors duration-300 hover:bg-[#FF9900]">
                      <FaAmazon />
                    </Link>
                    <Link className="w-8  h-8 border  rounded-full flex items-center justify-center hover:text-white hover:bg-[#FF0000] transition-colors duration-300">
                      <FaYoutube />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Cột 2  */}
              <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                <div className="footer-menu grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="footer-col-block">
                    <div className="text-[20px] font-bold mb-2">Infomation</div>
                    <div className="tf-collapse-content">
                      <div className="footer-menu-list space-y-2">
                        <Link to="about-us.html" className="footer-menu_item text-caption-1 block">
                          About Us
                        </Link>
                        <Link to="#" className="footer-menu_item text-caption-1 block">
                          Our Stories
                        </Link>
                        <Link to="#" className="footer-menu_item text-caption-1 block">
                          Size Guide
                        </Link>
                        <Link to="contact.html" className="footer-menu_item text-caption-1 block">
                          Contact us
                        </Link>
                        <Link to="#" className="footer-menu_item text-caption-1 block">
                          Career
                        </Link>
                        <Link to="my-account.html" className="footer-menu_item text-caption-1 block">
                          My Account
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="footer-col-block">
                    <div className="text-[20px] font-bold mb-2">Customer Services</div>
                    <div className="tf-collapse-content">
                      <div className="footer-menu-list space-y-2">
                        <Link to="#" className="footer-menu_item text-caption-1 block">
                          Shipping
                        </Link>
                        <Link to="#" className="footer-menu_item text-caption-1 block">
                          Return & Refund
                        </Link>
                        <Link to="#" className="footer-menu_item text-caption-1 block">
                          Privacy Policy
                        </Link>
                        <Link to="term-of-use.html" className="footer-menu_item text-caption-1 block">
                          Terms & Conditions
                        </Link>
                        <Link to="FAQs.html" className="footer-menu_item text-caption-1 block">
                          Orders FAQs
                        </Link>
                        <Link to="wish-list.html" className="footer-menu_item text-caption-1 block">
                          My Wishlist
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột 3  */}
              <div className="w-full lg:w-1/3 px-4">
                <div className="footer-col-block">
                  <div className="text-[20px] font-bold mb-2">Newsletter</div>
                  <div className="tf-collapse-content">
                    <div className="footer-newsletter">
                      <p className="text-caption-1 mb-4">
                        Sign up for our newsletter and get 10% off your first purchase
                      </p>
                      <form
                        className="form-newsletter subscribe-form w-full max-w-md"
                        action="#"
                        method="post"
                        acceptCharset="utf-8"
                        data-mailchimp="true"
                      >
                        <div className="flex h-13 rounded-full border border-gray-300 overflow-hidden justify-between items-center p-[2px]">
                          <input
                            type="email"
                            name="email-form"
                            className="px-4 outline-none text-sm"
                            placeholder="Enter your e-mail"
                            aria-required="true"
                          />
                          <ButtonComponent icon={MdArrowOutward} size={30} color="black" className="w-12 h-12" />
                        </div>
                      </form>
                      <div className="tf-cart-checkbox mt-4 flex items-start gap-2">
                        <div className="tf-checkbox-wrapp">
                          <input type="checkbox" id="footer-Form_agree" name="agree_checkbox" />
                          <div>
                            <i className="icon-check"></i>
                          </div>
                        </div>
                        <label className="text-caption-1" htmlFor="footer-Form_agree">
                          By clicking subscribe, you agree to the{" "}
                          <a className="fw-6 link underline" href="term-of-use.html">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a className="fw-6 link underline" href="#">
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </div>
    </div>
  );
};

export default Footer;
