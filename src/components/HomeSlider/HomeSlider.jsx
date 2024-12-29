import React from "react";
import SliderImage13 from "../../assets/images/WhatsApp Image 2024-12-27 at 19.35.16_d758e418.jpg";
import SliderImage1 from "../../assets/images/product2-Cc8hawmZ.jpg";
import SliderImage12 from "../../assets/images/product3-CjkhanyU.jpg";
import SliderImage2 from "../../assets/images/SliderImage12.jpg";
import SliderImage3 from "../../assets/images/SliderImage13.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 mb-8 ">
        <div className="col-span-12 md:col-span-8  overflow-hidden ">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
            }}
            className="h-full"
          >
            <SwiperSlide>
              <img
                src={SliderImage1}
                className=" h-full w-full object-cover"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={SliderImage12}
                className=" !h-full  object-cover w-full"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={SliderImage13}
                className=" !h-full object-cover w-full"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-6 md:col-span-4 flex   md:block">
          <img src={SliderImage2} className="w-full " alt="" />
          <img src={SliderImage3} className="w-full " alt="" />
        </div>
      </section>
    </>
  );
}
