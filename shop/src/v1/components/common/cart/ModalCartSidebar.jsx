import React, { useEffect } from "react";
import ButtonComponent from "./../../ui/ButtonComponent";
import { IoCloseOutline } from "react-icons/io5";

const ModalCartSidebar = ({ isOpen, onClose }) => {
  // Lock scroll on mount
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
    <div className="fixed inset-0 z-[9999] w-full h-full flex items-start justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full sm:w-[90%] md:w-[45%] max-w-screen-xl h-full overflow-y-auto shadow-lg z-10">
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] h-full">
          {/* LEFT: You May Also Like */}
          <div className="border-r w-full max-h-screen flex flex-col">
            {/* Tiêu đề cố định khi cuộn */}
            <h2 className="text-xl font-semibold bg-white sticky top-0 z-10 px-4 py-3">You May Also Like</h2>

            {/* Danh sách sản phẩm - cuộn độc lập */}
            <div className="overflow-y-auto px-4 py-3 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="flex flex-col gap-2 items-center">
                  <img
                    src="https://placehold.co/300x300/orange/white"
                    alt="suggested"
                    className="w-full object-cover rounded"
                  />
                  <div className="text-center">
                    <p className="font-medium">Belt wrap dress</p>
                    <p className="text-sm text-gray-500">$59.99</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 z-10 px-4 py-3"></div>
          </div>

          {/* RIGHT: Cart Content */}
          <div className="p-4 flex flex-col justify-between h-full">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <ButtonComponent icon={IoCloseOutline} onClick={onClose} className="text-xl hover:text-red-500" />
            </div>

            {/* Cart Items */}
            <div className="space-y-4 overflow-y-auto flex-1 max-h-[400px]">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4 items-center border-b pb-4">
                  <img
                    src="https://placehold.co/300x300/orange/white"
                    alt="cart"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Product name</p>
                    <p className="text-sm text-gray-500">XL / Blue</p>
                  </div>
                  <p className="font-semibold">$60.00</p>
                </div>
              ))}
            </div>

            {/* Subtotal + Checkout */}
            <div className="pt-6 border-t space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span>$120.00</span>
              </div>
              <div className="space-y-2">
                <ButtonComponent
                  title="View Cart"
                  className="w-full border border-black py-2 rounded hover:bg-black hover:text-white transition"
                />
                <ButtonComponent
                  title="Checkout"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCartSidebar;
