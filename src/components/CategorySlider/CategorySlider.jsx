import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../laoder/loader";
// import Swiper JS
// import Swiper styles
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const [categories, setcategories] = useState(null);
  async function getCategory() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setcategories(data.data);
    console.log(categories);
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <section className="my-8 ">
        <h2 className="mb-5 text-lg font-semibold text-gray-600">
          shop populer categories
        </h2>
        {!categories ? (
          <Loader />
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 5000,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1120: {
                slidesPerView: 6,
              },
            }}
          >
            {categories.map((categorie) => (
              <SwiperSlide key={categorie._id}>
                <div
                  to={`categoryProduct${categorie._id}`}
                  className="h-64 overflow-hidden cursor-pointer shadow-xl border border-gray-400 border-opacity-30"
                >
                  <Link to={`categoryProduct/${categorie._id}`}>
                    <img
                      src={categorie.image}
                      alt=""
                      className=" w-full h-full object-cover hover:scale-125 hover:transition-transform hover:duration-500  "
                    />
                  </Link>
                </div>
                <div className=" px-2 bg-gray-500 w-full">
                  <Link
                    to={`categoryProduct/${categorie._id}`}
                    className="mt-3  text-white"
                  >
                    {categorie.name}{" "}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}
