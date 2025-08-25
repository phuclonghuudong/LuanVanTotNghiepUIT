import React, {useEffect, useState} from "react";
import ProductGrid from "../../../components/common/products/ProductGrid";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    // nếu bạn muốn điều khiển từ bên ngoài thì ưu tiên prop isLoading
    if (typeof isLoading === "boolean") {
      setLoading(loading);
      return;
    }
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [loading]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "V-neck cotton T-shirt",
          price: 60,
          total: 60,
          img: "images/products/womens/women-19.jpg",
          color: "Blue",
          size: "XL",
          qty: 1,
        },
        {
          id: 2,
          name: "V-neck cotton T-shirt",
          price: 40,
          total: 40,
          img: "images/products/womens/women-1.jpg",
          color: "Blue",
          size: "XL",
          qty: 1,
        },
        {
          id: 3,
          name: "V-neck cotton T-shirt",
          price: 129,
          oldPrice: 80,
          total: 129,
          img: "images/products/womens/women-29.jpg",
          color: "Blue",
          size: "XL",
          qty: 1,
        },
        {
          id: 4,
          name: "V-neck cotton T-shirt",
          price: 129,
          oldPrice: 80,
          total: 129,
          img: "images/products/womens/women-29.jpg",
          color: "Blue",
          size: "XL",
          qty: 1,
        },
        {
          id: 5,
          name: "V-neck cotton T-shirt",
          price: 129,
          oldPrice: 80,
          total: 129,
          img: "images/products/womens/women-29.jpg",
          color: "Blue",
          size: "XL",
          qty: 1,
        },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
              total: (type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1)) * item.price,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.total, 0);
  // dữ liệu mẫu (fallback)
  const SAMPLE_PRODUCTS = [
    {
      name: "V-neck cotton T-shirt",
      price: 59.99,
      image: "images/products/womens/women-19.jpg",
      hoverImage: "images/products/womens/women-20.jpg",
      colors: ["#1e3a8a", "#111827"],
      sale: null,
    },
    {
      name: "Polarized sunglasses",
      price: 79.99,
      oldPrice: 98.0,
      image: "images/products/womens/women-176.jpg",
      hoverImage: "images/products/womens/women-179.jpg",
      colors: ["#60a5fa", "#1d4ed8"],
      sale: 25,
    },
    {
      name: "Ramie shirt with pockets",
      price: 89.99,
      oldPrice: 98.0,
      image: "images/products/womens/women-29.jpg",
      hoverImage: "images/products/womens/women-30.jpg",
      colors: ["#f59e0b", "#d1d5db"],
      sale: null,
    },
    {
      name: "Ribbed cotton-blend top",
      price: 69.99,
      image: "images/products/womens/women-1.jpg",
      hoverImage: "images/products/womens/women-2.jpg",
      colors: ["#111827", "#f472b6", "#374151"],
      sale: null,
    },
  ];
  const CardSkeleton = () => (
    <div className="relative rounded-md overflow-hidden border border-zinc-200">
      <div className="animate-pulse">
        <div className="aspect-[4/5] bg-zinc-100" />
        <div className="p-3 space-y-2">
          <div className="h-4 w-3/4 bg-zinc-100 rounded" />
          <div className="h-5 w-1/3 bg-zinc-100 rounded" />
          <div className="flex gap-2 pt-2">
            <div className="h-5 w-5 rounded-full bg-zinc-100" />
            <div className="h-5 w-5 rounded-full bg-zinc-100" />
            <div className="h-5 w-5 rounded-full bg-zinc-100" />
          </div>
        </div>
      </div>
    </div>
  );
  const showSkeleton = loading;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-8">
        {/* Left - Cart */}
        <div className="lg:col-span-8 space-y-6">
          {/* Notification */}
          <div className="bg-gray-100 p-4 rounded-md flex items-center gap-4">
            <img src="images/logo/icon-fire.png" alt="fire" className="w-8 h-8" />
            <p className="text-sm text-gray-700">
              Your cart will expire in <span className="font-semibold">10:00</span> minutes! Please checkout now before
              your items sell out!
            </p>
          </div>

          {/* Progress */}
          <div>
            <p className="text-sm mb-2">
              Buy <span className="text-orange-500 font-semibold">$70.00</span> more to get{" "}
              <span className="font-semibold">Freeship</span>
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-orange-500 h-2 rounded-full w-1/2 relative">
                <span className="absolute right-0 -top-1 w-3 h-3 bg-orange-500 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            // Skeleton loading
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 items-center border p-4 rounded">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-sm text-left">
                    <th className="p-3">Products</th>
                    <th className="p-3 text-center">Price</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3 text-center">Total Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3 flex gap-4 items-start">
                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <div className="flex gap-2 mt-1">
                            <select defaultValue={item.color} className="border px-2 py-1 text-sm rounded">
                              <option>Blue</option>
                              <option>Black</option>
                              <option>White</option>
                            </select>
                            <select defaultValue={item.size} className="border px-2 py-1 text-sm rounded">
                              <option>XS</option>
                              <option>S</option>
                              <option>M</option>
                              <option>L</option>
                              <option>XL</option>
                            </select>
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-3">
                        <span className="font-medium">
                          {item.oldPrice && <span className="line-through mr-1 text-gray-400">${item.oldPrice}</span>}$
                          {item.price}
                        </span>
                      </td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center border rounded w-fit mx-auto">
                          <button onClick={() => updateQty(item.id, "dec")} className="px-2 py-1">
                            -
                          </button>
                          <input type="text" value={item.qty} readOnly className="w-10 text-center border-x" />
                          <button onClick={() => updateQty(item.id, "inc")} className="px-2 py-1">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center p-3 font-medium">${item.total}</td>
                      <td className="text-center p-3">
                        <button onClick={() => removeItem(item.id)} className="text-red-500">
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Voucher Input */}
          <div className="flex gap-3 mt-4">
            <input type="text" placeholder="Add voucher discount" className="flex-1 border px-3 py-2 rounded" />
            <button className="bg-black text-white px-4 rounded">Apply</button>
          </div>

          {/* Discount Boxes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3].map((d, i) => (
              <div key={i} className={`p-4 border rounded-md ${i === 1 ? "bg-gray-50 border-orange-500" : "bg-white"}`}>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm">Discount</p>
                    <span className="text-orange-500 font-semibold">10% OFF</span>
                  </div>
                  <p className="text-sm text-gray-500">For all orders over $200</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Mo234231</span>
                  <button className="bg-black text-white text-sm px-3 py-1 rounded">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Order Summary */}

        <div className="lg:col-span-4">
          <div className="sticky top-7">
            <div className="bg-gray-50 p-6 rounded-md space-y-4">
              <h5 className="text-lg font-semibold">Order Summary</h5>
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discounts</span>
                    <span>-$20</span>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="ship" defaultChecked /> Free Shipping
                      <span className="ml-auto">$0</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="ship" /> Local
                      <span className="ml-auto">$35</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="ship" /> Flat Rate
                      <span className="ml-auto">$35</span>
                    </label>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${subtotal - 20}</span>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> I agree with{" "}
                  <a href="/terms" className="underline">
                    terms and conditions
                  </a>
                </label>
                <button className="w-full bg-black text-white py-3 rounded font-medium">Proceed To Checkout</button>
                <p className="text-center text-sm">Or continue shopping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-20">
        <div className="text-center mb-6">
          <h4 className="text-2xl md:text-4xl font-semibold">You may also like</h4>
        </div>

        {showSkeleton ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ProductGrid products={SAMPLE_PRODUCTS} />
        )}
      </div>
    </section>
  );
};

export default Cart;
