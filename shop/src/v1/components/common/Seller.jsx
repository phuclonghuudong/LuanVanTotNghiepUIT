import React from 'react'
import HeadingSection from './HeadingSection';
import ProductSeller from './ProductSeller';
import Image1 from '../../assets/products/women-2.jpg';
import Image2 from '../../assets/products/women-3.jpg';
import Image3 from '../../assets/products/women-4.jpg';
import Image4 from '../../assets/products/women-5.jpg';
import Image5 from '../../assets/products/women-6.jpg';

const Seller = () => {
     const ProductData=[
    {
        id:1,
        image:Image1,
        title:"Women Ethnic",
        rating:5.0,
        color:'white',
        aosDelay:"0",
    },
    {
        id:2,
        image:Image2,
        title:"Women western",
        rating:5.0,
        color:'red',
        aosDelay:"200",
    },
    {
        id:3,
        image:Image3,
        title:"Goggles",
        rating:5.0,
        color:'red',
        aosDelay:"400",
    },
    {
        id:4,
        image:Image4,
        title:"Goggles as",
        rating:5.0,
        color:'red',
        aosDelay:"600",
    },
    {
        id:5,
        image:Image5,
        title:"The new brand",
        rating:5.0,
        color:'red',
        aosDelay:"800",
    },
];
    const products=ProductData.map((item)=>({
    title:item.title,
    image:item.image,
    rating:item.rating,
    color:item.color,
    aosDelay:item.aosDelay

  }))
  return (
    <div>
      <HeadingSection/>
      <ProductSeller data={products} />
    </div>
  )
}

export default Seller
