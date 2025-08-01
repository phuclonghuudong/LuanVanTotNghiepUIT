import { BiGitCompare } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import IconComponent from "../../ui/IconComponent";
import ButtonComponent from "../../ui/ButtonComponent";
const ProductGrid = ({ products }) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products.map((product, index) => (
        <div key={index} className='relative group shadow-md hover:shadow-md transition-all'>
          {/* Sale Badge */}
          {product.sale && (
            <span className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-[2px] z-10 rounded-full'>
              -{product.sale} %
            </span>
          )}
          {/* Icon buttons */}
          <div className='absolute top-2 right-2 flex flex-col items-center justify-center gap-2 z-10 transition-all'>
            <IconComponent icon={IoMdHeartEmpty} color='gray' size={18} />
            <IconComponent icon={BiGitCompare} color='gray' size={18} />
            <IconComponent icon={IoEyeOutline} color='gray' size={18} />
          </div>
          {/* Image full */}
          <div className='relative  aspect-[4/5] overflow-hidden rounded-tl-md rounded-tr-md'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-full object-cover group-hover:opacity-0 transition-all'
            />
            {product.hoverImage && (
              <img
                src={product.hoverImage}
                alt={`${product.name} hover`}
                className='w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all'
              />
            )}
            {/* Add to cart */}
            <ButtonComponent
              title='ADD TO CART'
              // icon={MdShoppingCart} // có thể bỏ nếu chỉ cần chữ
              size={18}
              color='gray'
              rounded='full'
              className='absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 text-sm font-medium'
            />
          </div>
          {/* Name + Price */}
          <div className='m-3'>
            <h3 className='text-sm font-semibold leading-tight'>{product.name}</h3>
            <div className='flex items-center gap-2'>
              {product?.oldPrice && <span className='text-sm line-through text-gray-400'>$ {product?.oldPrice}</span>}
              <span className='text-base font-bold text-black'>${product.price}</span>
            </div>
          </div>
          {/* Colors */}
          {product.colors && (
            <div className='flex items-center gap-2 my-2 mx-3'>
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className={`w-5 h-5 rounded-full border-2  transition-all ${
                    idx === 0 ? "border-black" : "border-transparent hover:border-black"
                  }`}
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
