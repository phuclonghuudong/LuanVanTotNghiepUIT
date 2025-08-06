import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageGalleryComponent = ({ images = [] }) => {
  const slider1 = useRef(null); // slider chính
  const slider2 = useRef(null); // thumbnail

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      {/* Thumbnails */}
      <div className='w-full md:w-24 md:order-1 order-2 flex md:flex-col flex-row gap-y-2 overflow-x-hidden overflow-y-auto md:overflow-y-auto md:overflow-x-hidden'>
        <Slider
          asNavFor={nav1}
          ref={slider2}
          slidesToShow={isDesktop ? 4 : 3}
          swipeToSlide
          focusOnSelect
          vertical={isDesktop}
          className='thumb-slider w-full'
        >
          {images.map((img, idx) => (
            <div key={idx} className='w-9 md:w-full md:h-full rounded-md gap-2'>
              <img src={img} alt={`thumb-${idx}`} className='p-1 w-full  md:w-full md:h-30 object-cover rounded-md ' />
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Image */}
      <div className='md:flex-1 md:order-2 order-1 overflow-hidden'>
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
