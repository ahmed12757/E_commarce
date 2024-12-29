import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/laoder/loader";
import { useParams } from "react-router-dom";
import { CartContext } from "../../components/context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

export default function PruductDetals() {
  let [productDetails, setProductDetails] = useState(null);
  let [RelatedProducts, setRelatedProducts] = useState(null);
  let { id } = useParams();
  const { addProductToCart } = useContext(CartContext);
  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    if (productDetails === null) return;
    getRelatedProducts();
  }, [productDetails]);

  return (
    <>
      <Helmet>
        <title>proudct details</title>
      </Helmet>
      {productDetails ? (
        <>
          <section className="  grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12  px-5  gap-12">
            <div className=" md:col-span-3  lg:col-span-5 col-span-1">
              <div className=" border-2  border-primary-500 p-2">
                <ReactImageGallery
                  disableThumbnailSwipe={true}
                  disableSwipe={true}
                  showNav={false}
                  autoPlay={true}
                  slideDuration={500}
                  showPlayButton={false}
                  showBullets={true}
                  items={productDetails.images.map((image) => {
                    return {
                      original: image,
                      thumbnail: image,
                    };
                  })}
                />
              </div>
            </div>
            <div className="col-span-1 my-auto md:col-span-3 lg:col-span-7 space-y-4 py-5">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600 ">
                  {" "}
                  {productDetails.title}{" "}
                </h2>
                <h3 className="font-bold text-primary-500">
                  {" "}
                  {productDetails.category.name}{" "}
                </h3>
              </div>
              <p className=" text-gray-400 "> {productDetails.description} </p>

              <div className="flex items-center justify-between">
                <span className=" font-semibold text-gray-600 ">
                  price :{" "}
                  <span className=" text-primary-500">
                    {productDetails.price}
                  </span>
                </span>
                <div className=" space-x-2">
                  <span>{productDetails.ratingsAverage}</span>
                  <span>
                    <i className="fa-solid fa-star text-yellow-500"></i>
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
                className="btn w-full rounded-lg my-3 bg-primary-500 hover:bg-primary-600 hover:transition-colors hover:duration-300"
              >
                add to cart
              </button>
            </div>
          </section>
          <section className="mt-4 pt-5">
            <div className=" flex justify-center items-center">
              <h2 className=" font-bold text-center mx-auto text-lg text-primary-600 border-b-2 border-opacity-30 relative border-primary-500 w-fit mb-5 after:w-3/4 after:bg-primary-500 after:bg-opacity-30 after:mx-auto after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:absolute after:h-[2px] after:block ">
                Related Products
              </h2>
            </div>
            {RelatedProducts ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={2}
                spaceBetween={5}
                autoplay={{
                  delay: 5000,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1120: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                }}
              >
                {RelatedProducts.map((products) => (
                  <SwiperSlide key={products.id}>
                    <Card InfoProudact={products} id={id} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loader />
            )}
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
