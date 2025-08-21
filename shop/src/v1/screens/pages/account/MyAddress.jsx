import React, { useEffect, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FiLogOut, FiShoppingCart, FiUser } from "react-icons/fi";
import IconComponent from "../../../components/ui/IconComponent";
import PageTitle from "../../../components/common/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyAddress = () => {
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // nếu chưa login → quay lại trang trước đó
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null; // tránh render flicker
  return (
    <div>
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
                <h6 className="text-2xl font-semibold">{user?.fullname}</h6>
                <div className="text-md font-medium text-gray-600">{user?.email}</div>
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
                  to="/account-address"
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
            {/* Address */}
            <div>
              <div className="text-center">
                {/* <!-- Add new address CTA --> */}
                <button
                  className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-amber-600 mb-5"
                  id="btn-address"
                  onClick={() => setAddAddress(!addAddress)}
                >
                  <span className="text-sm font-medium">Add a new address</span>
                </button>
                {/* <!-- Add address form (hidden by default) --> */}
                <div className="text-center">
                  <form
                    action="#"
                    className={`mx-auto max-w-3xl text-left ${addAddress ? "" : "hidden"}`}
                    id="form-add-address"
                  >
                    <div className="text-xl font-semibold mb-4">Add a new address "popul hidden add new address"</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <input
                        type="text"
                        placeholder="First Name*"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name*"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <input
                        type="email"
                        placeholder="Username or email address*"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Phone*"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Address"
                      required
                      className="mb-5 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <select
                      name="address[country]"
                      className="mb-5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>United States</option>
                      <option>Vietnam</option>
                      <option>Australia</option>
                      {/* <!-- ...các option khác --> */}
                    </select>

                    <input
                      type="text"
                      placeholder="City"
                      required
                      className="mb-5 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <label className="mb-5 flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
                      />
                      <span className="text-sm text-gray-700">Set as default address.</span>
                    </label>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-amber-600"
                      >
                        <span className="text-sm font-medium">Add address</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                        id="btn-cancel-add"
                        onClick={() => setAddAddress(false)}
                      >
                        <span className="text-sm font-medium">Cancel</span>
                      </button>
                    </div>
                  </form>
                </div>
                {/* <!-- Address list --> */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* <!-- Address item 1--> */}
                  <div className="rounded-lg border border-gray-200 p-5">
                    <h6 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-700">Default</h6>
                    <p>themesflat</p>
                    <p>1234 Fashion Street, Suite 567</p>
                    <p>New York</p>
                    <p>themesflat.com</p>
                    <p className="mb-3">(212) 555-1234</p>
                    <div className="flex justify-center gap-3">
                      <button
                        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-amber-600 btn-edit-address"
                        onClick={() => setEditAddress()}
                      >
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md border border-black px-4 py-2 text-black hover:bg-amber-50 btn-delete-address">
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>
                    {/* <!-- Edit form (hidden by default) --> */}
                    <form action="#" className="mt-5 hidden" id="form-edit-address-1">
                      <div className="text-lg font-semibold mb-4">Edit address "popul hidden edit address"</div>
                      <input
                        type="text"
                        placeholder="First Name*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Username or email address*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Phone*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <select
                        name="address[country]"
                        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>United States</option>
                        <option>Vietnam</option>
                        <option>Australia</option>
                      </select>
                      <input
                        type="text"
                        placeholder="City"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <label className="mb-4 flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
                        />
                        <span className="text-sm text-gray-700">Set as default address.</span>
                      </label>
                      <div className="flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={() => setEditAddress(!editAddress)}
                          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-amber-600"
                        >
                          <span className="text-sm font-medium">Add address</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 btn-hide-edit-address"
                        >
                          <span className="text-sm font-medium">Cancel</span>
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <!-- Address item 2--> */}
                  <div className="rounded-lg border border-gray-200 p-5">
                    <h6 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-700">Default</h6>
                    <p>themesflat</p>
                    <p>1234 Fashion Street, Suite 567</p>
                    <p>New York</p>
                    <p>themesflat.com</p>
                    <p className="mb-3">(212) 555-1234</p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setEditAddress(!editAddress)}
                        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-amber-600 btn-edit-address"
                      >
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md border border-black px-4 py-2 text-black hover:bg-amber-50 btn-delete-address">
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>
                    {/* <!-- Edit form (hidden by default) --> */}
                    <form action="#" className={`${editAddress ? "" : "hidden"}`}>
                      <div className="text-lg font-semibold mb-4">Edit address "popul add edit address"</div>
                      <input
                        type="text"
                        placeholder="First Name*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Username or email address*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Phone*"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <select
                        name="address[country]"
                        className="mb-4 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>United States</option>
                        <option>Vietnam</option>
                        <option>Australia</option>
                      </select>
                      <input
                        type="text"
                        placeholder="City"
                        required
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <label className="mb-4 flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
                        />
                        <span className="text-sm text-gray-700">Set as default address.</span>
                      </label>
                      <div className="flex flex-col gap-3">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-amber-600"
                        >
                          <span className="text-sm font-medium">Add address</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 btn-hide-edit-address"
                        >
                          <span className="text-sm font-medium">Cancel</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /MY ACCOUNT --> */}
    </div>
  );
};

export default MyAddress;
