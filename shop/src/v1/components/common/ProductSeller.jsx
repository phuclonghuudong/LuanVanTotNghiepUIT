import React from 'react'
import { Link } from "react-router";
import { FaStar } from 'react-icons/fa6';

const ProductSeller = ({data}) => {
    console.log(data);
   
  return (
    <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-2'>
                {/* Card section */}
                {
                    data.map((item,index)=>(
                        <div
                        data-aos="fade-up"
                        data-aos-delay={item.aosDelay}
                        className=''
                        key={index}>
                            <img src={item.image} alt={item.title} 
                            className='h-[220px] w-[220px] object-cover rounded-md'
                            />
                            <div>
                                <h3 className='font-semibold'>{item.title}</h3>
                                <p  className='text-sm text-gray-600'>{item.color}</p>
                                <div className='flex items-center gap-1'>
                                    <FaStar className='text-yellow-400'/>
                                    <span>{item.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {/* view all button */}
            <div className='flex justify-center mt-3 mb-14' data-aos="fade-up">
                <Link to='/products'>
                <span className='text-lg text-black hover:text-red-600 font-bold underline'>View All Collection</span>
                </Link>
            </div>
        </div>
  )
}

export default ProductSeller
