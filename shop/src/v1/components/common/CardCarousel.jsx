import React from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import { MdArrowOutward } from "react-icons/md";
const CardCarousel = ({ title, data }) => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <>
      <div className="w-full max-w-7xl mx-auto my-12  px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-black">
            {title}
          </h2>
          <Link to="/products">
            <span className="text-lg text-black hover:text-red-600 font-bold underline">
              View All Collection
            </span>
          </Link>
        </div>
        <div className="pt-4 px-3 w-full mx-auto">
          <Slider {...settings}>
            {data.map((data) => (
              <div className="flex flex-col bg-white overflow-hidden">
                <div className="relative h-full px-1 overflow-hidden">
                  <div>
                    <img
                      className="rounded-full overflow-hidden object-cover w-full h-full"
                      src={data.image}
                      alt="collection-img"
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-2  justify-items-center justify-center">
                  <div className="flex items-center text-center justify-center">
                    <a href="#" className="flex items-center gap-1  group">
                      <h6 className="text-lg text-black font-semibold hover:text-red-600 duration-200">
                        {data.name}
                      </h6>
                      <MdArrowOutward
                        size={20}
                        className="hidden group-hover:flex text-red-600 transition-opacity duration-200"
                      />
                    </a>
                  </div>
                  <div className="flex text-gray-600 text-center items-center justify-center">
                    {data.quantity}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
