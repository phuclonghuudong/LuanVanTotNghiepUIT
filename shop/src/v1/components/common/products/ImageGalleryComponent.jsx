import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageGalleryComponent = ({ images = [] }) => {
  const slider1 = useRef(null); // slider chính
  const slider2 = useRef(null); // thumbnail

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      {/* Thumbnails */}
      <div className='md:w-24 md:flex md:flex-col flex-row gap-y-2 overflow-y-auto md:overflow-y-auto md:overflow-x-hidden justify-between '>
        <Slider
          asNavFor={nav1}
          ref={slider2}
          slidesToShow={5}
          swipeToSlide
          focusOnSelect
          vertical
          className='thumb-slider'
        >
          {images.map((img, idx) => (
            <div key={idx} className='h-full rounded-md'>
              <img src={img} alt={`thumb-${idx}`} className='w-full h-30 object-cover rounded-md' />
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Image */}
      <div className='md:flex-1 overflow-hidden'>
        <Slider asNavFor={nav2} ref={slider1} arrows={false} className='main-slider'>
          {images.map((img, idx) => (
            <div key={idx} className='h-full w-full'>
              <img
                src={img}
                alt={`main-${idx}`}
                className='w-full h-auto object-cover rounded shadow-md transition-transform duration-300 hover:scale-115'
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageGalleryComponent;
