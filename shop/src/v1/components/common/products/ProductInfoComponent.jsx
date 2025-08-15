import { useState } from "react";
import { FaCompass, FaHeart } from "react-icons/fa";
import ButtonComponent from "./../../ui/ButtonComponent";
import IconComponent from "./../../ui/IconComponent";

const ProductInfoComponent = ({ product }) => {
  const { name, price, originalPrice, discount, description, colors, sizes, category, rating, reviews } = product;

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-5">
      {/* Category & Name */}
      <div>
        <p className="text-sm uppercase text-gray-400">{category}</p>
        <h2 className="text-2xl font-bold">{name}</h2>
      </div>

      {/* Ratings & Sold Info */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
          {rating}
          <span>({reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⚡</span>
          <span>18 sold in last 32 hours</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-semibold text-red-500">${price}</h3>
        <del className="text-gray-500">${originalPrice}</del>
        {discount && <span className="text-white bg-red-500 px-2 py-1 rounded text-sm">{discount}</span>}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">{description}</p>

      {/* Colors */}
      <div className="">
        <p className="font-semibold mb-2">
          Colors: <span className={`text-${selectedColor}-500`}>{selectedColor}</span>
        </p>
        <div className="flex gap-2 h-9">
          {colors.map((color, index) => (
            <ButtonComponent
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`h-9 w-9 border-2 ${selectedColor === color ? "border-black" : "border-transparent"}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className="flex justify-between mb-2">
          <p className="font-semibold">
            Size: <span className="text-gray-600">{selectedSize}</span>
          </p>
        </div>
        <div className="flex gap-3">
          {sizes.map((size, i) => (
            <ButtonComponent
              key={i}
              title={size}
              onClick={() => setSelectedSize(size)}
              className={` h-11 w-11 text-center ${
                selectedSize === size ? "border-black font-semibold" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="font-semibold mb-4">Quantity:</p>
        <div className="flex items-center gap-3 w-36 h-10 border rounded-full justify-between px-2">
          <span onClick={() => setQuantity((prev) => prev - 1)} className="text-3xl font-semibold  cursor-pointer h-10">
            -
          </span>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-10 text-center border-none outline-none bg-transparent"
          />

          <span onClick={() => setQuantity((prev) => prev + 1)} className="text-3xl font-semibold  cursor-pointer h-10">
            +
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <ButtonComponent title={`Add to Cart - $${(price * quantity).toFixed(2)}`} color="black" className="w-full" />
        <IconComponent icon={FaCompass} size={25} />
        <IconComponent icon={FaHeart} size={20} />
      </div>
      <ButtonComponent title={"MUA HÀNG"} color="black" className="w-full" />
    </div>
  );
};

export default ProductInfoComponent;
