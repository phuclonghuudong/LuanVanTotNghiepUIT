import React from 'react'
import Image1 from '../../assets/collection/cls-circle1.jpg';
import Image2 from '../../assets/collection/cls-circle2.jpg';
import Image3 from '../../assets/collection/cls-circle3.jpg';
import Image4 from '../../assets/collection/cls-circle4.jpg';
import Image5 from '../../assets/collection/cls-circle5.jpg';
import Image6 from '../../assets/collection/cls-circle6.jpg';
import Image7 from '../../assets/collection/cls-circle7.jpg';
import Image8 from '../../assets/collection/cls-circle8.jpg';
import Slider from 'react-slick';
import CardCarousel from './CardCarousel';
const CollectionData=[
  {
    id:1,
    name:"New in",
    image:Image1,
    quantity:"12 items"
  },
  {
    id:2,
    name:"Promotion",
    image:Image2,
    quantity:"12 items"
  },
  {
    id:3,
    name:"Clothing",
    image:Image3,
    quantity:"12 items"
  },
  {
    id:4,
    name:"Shoes",
    image:Image4,
    quantity:"12 items"
  },
  {
    id:5,
    name:"Bags",
    image:Image5,
    quantity:"12 items"
  },
  {
    id:6,
    name:"New in",
    image:Image6,
    quantity:"12 items"
  },
  {
    id:7,
    name:"Feature",
    image:Image7,
    quantity:"12 items"
  },
  {
    id:8,
    name:"New in",
    image:Image8,
    quantity:"12 items"
  },
]
function Collection() {
  
  const collections=CollectionData.map((item)=>({
    name:item.name,
    image:item.image,
    quantity:item.quantity
  }))
  return (
    <>
    <CardCarousel title="Categories you might like" data={collections}/>
    {/* <div>
      <div className='container mx-auto px-[10px]'>
         Header  collection section 
        <div className="flex md:flex-row flex-col justify-items-center items-center mb-11 md:justify-between md:items-start gap-3 ">
            <h3 className='text-[24px] leading-[30px]'>Categories you might like</h3>
            <a href="#" className="text-[14px] leading-[22px] pb-1 font-semibold">View All Collection</a>
        </div>
        <div className='items-center'>
            <Slider {...settings}>
              {
                CollectionData.map((data)=>(
                  <div className='lg:flex lg:flex-col grid sm:grid-cols-1 items-center justify-items-center gap-3'>
                      <div className='lg:h-[244px] lg:w-[244px] md:h-[300px] md:w-[300px] h-[300px] w-[300px]'>
                        <a href="#" className="block ">
                            <img className="rounded-full overflow-hidden object-cover w-full h-full"   src={data.image} alt="collection-img"/>
                        </a>
                      </div>
                      <div className="pt-1">
                          <div>
                              <a href="#" className="cls-title">
                                  <h6 className="text">{data.title}</h6>
                                  <i className="icon icon-arrowUpRight"></i>    
                              </a>
                          </div>
                          <div className="count text-secondary">12 items</div>
                      </div>
                  </div>
                ))}
            </Slider>
        </div>
      </div>
    </div> */}
      
    </>
  )
}

export default Collection
