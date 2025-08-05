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
    <div className='space-y-5'>
      {/* Category & Name */}
      <div>
        <p className='text-sm uppercase text-gray-400'>{category}</p>
        <h2 className='text-2xl font-bold'>{name}</h2>
      </div>

      {/* Ratings & Sold Info */}
      <div className='flex items-center gap-4 text-sm text-gray-600'>
        <div className='flex items-center gap-1'>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className='text-yellow-400'>
              ★
            </span>
          ))}
          {rating}
          <span>({reviews} reviews)</span>
        </div>
        <div className='flex items-center gap-1'>
          <span>⚡</span>
          <span>18 sold in last 32 hours</span>
        </div>
      </div>

      {/* Price */}
      <div className='flex items-center gap-4'>
        <h3 className='text-2xl font-semibold text-red-500'>${price}</h3>
        <del className='text-gray-500'>${originalPrice}</del>
        {discount && <span className='text-white bg-red-500 px-2 py-1 rounded text-sm'>{discount}</span>}
      </div>

      {/* Description */}
      <p className='text-sm text-gray-700'>{description}</p>

      {/* Colors */}
      <div>
        <p className='font-semibold mb-2'>
          Colors: <span className='text-gray-600'>{selectedColor}</span>
        </p>
        <div className='flex gap-2'>
          {colors.map((color, i) => (
            <button
              key={i}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 ${
                selectedColor === color ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className='flex justify-between mb-2'>
          <p className='font-semibold'>
            Size: <span className='text-gray-600'>{selectedSize}</span>
          </p>
          <a href='#size-guide' className='text-sm underline'>
            Size Guide
          </a>
        </div>
        <div className='flex gap-3'>
          {sizes.map((size, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 rounded border ${
                selectedSize === size ? "border-black font-semibold" : "border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className='font-semibold mb-2'>Quantity:</p>
        <div className='flex items-center gap-3'>
          <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className='px-3 py-1 border rounded'>
            -
          </button>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className='w-12 text-center border rounded'
          />
          <button onClick={() => setQuantity((prev) => prev + 1)} className='px-3 py-1 border rounded'>
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3 mt-4'>
        <ButtonComponent title={`Add to Cart - $${(price * quantity).toFixed(2)}`} color='black' className='w-full' />
        <IconComponent icon={FaCompass} size={25} />
        <IconComponent icon={FaHeart} size={20} />
      </div>
    </div>
  );
};

export default ProductInfoComponent;
