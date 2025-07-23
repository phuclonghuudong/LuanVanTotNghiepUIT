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
    quantity:"11 items"
  },
]
const Collection=()=> {
  
  const collections=CollectionData.map((item)=>({
    name:item.name,
    image:item.image,
    quantity:item.quantity
  }))
  return (
    <CardCarousel title="Categories you might like" data={collections}/>
  )
}

export default Collection
