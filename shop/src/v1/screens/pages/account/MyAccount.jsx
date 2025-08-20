import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import { Link } from "react-router-dom";
import IconComponent from "./../../../components/ui/IconComponent";
import { FiLogOut, FiShoppingCart, FiUser } from "react-icons/fi";
import { BiLocationPlus } from "react-icons/bi";

const MyAccount = () => {
  return (
    <div data-aos="fade-up">
      <PageTitle
        title="My Account"
        withBackground={true}
        breadcrumbAlign="center"
        breadcrumb={[{ label: "Homepage", href: "/" }, { label: "Pages", href: "/" }, { label: "My account" }]}
      />

      {/* <!-- MY ACCOUNT --> */}
      <section className="py-10">
        <div className=" w-full max-w-7xl px-2 md:px-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_2fr] gap-10">
            {/* <!-- SIDEBAR --> */}
            <div className="rounded-3xl  bg-[#f7f7f7] p-5 h-max  lg:top-6">
              {/* <!-- Avatar --> */}
              <div className="flex flex-col items-center gap-3 border-b pb-5">
                <div className="h-20 w-20 overflow-hidden rounded-full ring-1 ring-gray-200">
                  <img src="images/avatar/user-account.jpg" alt="avatar" className="h-full w-full object-cover" />
                </div>
                <h6 className="text-2xl font-semibold">Tony Nguyen</h6>
                <div className="text-md font-medium text-gray-600">themesflat@gmail.com</div>
              </div>

              {/* <!-- Nav --> */}
              <ul className="mt-4 space-y-3">
                <Link
                  to="/#"
                  className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium bg-white hover:bg-white hover:text-gray-900"
                >
                  <IconComponent icon={FiUser} size={22} />
                  Account Details
                </Link>

                <Link
                  to="/#"
                  className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium bg-[#f7f7f7] hover:bg-white hover:text-gray-900"
                >
                  <IconComponent icon={FiShoppingCart} size={22} color={"#f7f7f7"} />
                  Your Orders
                </Link>

                <Link
                  to="/auth/account-address"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-[#f7f7f7] hover:bg-white hover:text-gray-900"
                >
                  <IconComponent icon={BiLocationPlus} size={22} />
                  My Address
                </Link>
                <Link
                  to="/#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-[#f7f7f7] hover:bg-white "
                >
                  <IconComponent icon={FiLogOut} size={22} />
                  Logout
                </Link>
              </ul>
            </div>

            {/* <!-- CONTENT --> */}
            <div className="rounded-lg  bg-white p-5">
              <form action="#" className="space-y-8">
                {/* <!-- Information --> */}
                <div>
                  <h5 className="mb-4 text-2xl font-semibold">Information</h5>

                  <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        defaultValue={"Tony"}
                        placeholder="First Name*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        defaultValue={"Nguyen"}
                        placeholder="Last Name*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="email"
                        defaultValue={"themesflat@gmail.com"}
                        placeholder="Email*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        defaultValue={"(+12) 345 678 910"}
                        placeholder="Phone*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <select
                      id="country"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900"
                    >
                      <option>United States</option>
                      <option>Vietnam</option>
                      <option>Japan</option>
                      <option>Italy</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>

                {/* <!-- Change Password --> */}
                <div>
                  <h5 className="mb-4 text-2xl font-semibold">Change Password</h5>

                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Password*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm outline-none focus:border-gray-900"
                        required
                      />
                      <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                        {/* <!-- icon eye (placeholder) --> */}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="New Password*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm outline-none focus:border-gray-900"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      ></button>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Confirm Password*"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm outline-none focus:border-gray-900"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      ></button>
                    </div>
                  </div>
                </div>

                {/* <!-- Submit --> */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
                  >
                    Update Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /MY ACCOUNT --> */}
    </div>
  );
};

export default MyAccount;
