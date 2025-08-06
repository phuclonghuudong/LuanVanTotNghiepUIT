import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/slide/women.png";
import Image2 from "../../assets/slide/shopping.png";
import Image3 from "../../assets/slide/sale.png";
import ButtonComponent from "../ui/ButtonComponent";
const ImageList = [
  {
    id: 1,
    image: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium fuga quo, dolorem quis corrupti illum alias molestias placeat dicta expedita quidem laudantium eligendi! Architecto, ratione alias esse reiciendis maxime repellendus!",
  },
  {
    id: 2,
    image: Image2,
    title: "30% off on all Shopping",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium fuga quo, dolorem quis corrupti illum alias molestias placeat dicta expedita quidem laudantium eligendi! Architecto, ratione alias esse reiciendis maxime repellendus!",
  },
  {
    id: 3,
    image: Image3,
    title: "70% off on all Products Sale",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium fuga quo, dolorem quis corrupti illum alias molestias placeat dicta expedita quidem laudantium eligendi! Architecto, ratione alias esse reiciendis maxime repellendus!",
  },
];
const Slide = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[550px] bg-gray-100 flex justify-center items-center duration-200">
      {/* background pattern */}
      <div className="h-[700px] w-[600px] bg-[#fea928]/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 z-1"></div>
      {/* hero section */}
      <div className="container pb-8 sm:pb-0 z-10">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div className="px-5">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p data-aos="fade-up" data-aos-duration="500" data-aos-deplay="100" className="text-sm">
                    {data.description}
                  </p>
                  <div data-aos="fade-up" data-aos-duration="500" data-aos-deplay="300">
                    <ButtonComponent
                      title="Order Now"
                      // icon={MdShoppingCart} // có thể bỏ nếu chỉ cần chữ
                      size={18}
                      color="gray"
                      rounded="full"
                      className="bg-gradient-to-r from-[#fea928] to-[#ed8900] hover:scale-110 duration-200 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                    />
                  </div>
                </div>
                {/* imgae section */}
                <div className="order-1 sm:order-2">
                  <div data-aos="zoom-in" data-aos-once="true" className="relative z-10">
                    <img
                      src={data.image}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 lg:scale-110 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
