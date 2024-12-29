import { useContext } from "react";
import { CartContext } from "../context/Cart.context";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { imageCover, title, category, ratingsAverage, id } = product;
  let { removProductFromCart, UpdatCart } = useContext(CartContext);
  return (
    <>
      <div className="cart-item mx-3 space-y-6 grow bg-gray-100  grid grid-cols-12 py-4 px-6 rounded-lg">
        <div className=" col-span-12 cursor-pointer m-auto md:col-span-2 border-2 border-primary-500 rounded-3xl overflow-hidden  shadow-lg hover:border-primary-200 hover:transition-all hover:duration-300">
          <img src={imageCover} alt="" className="w-24 h-28 object-cover   " />
        </div>
        <div className="gap-3 !my-auto col-span-12 md:col-span-10 grid grid-cols-12   ">
          <div className=" align-middle my-auto md:mx-2 text-center md:text-left space-y-3 col-span-12 md:col-span-6">
            {/* caet title */}
            <h3 className="text-lg my-3 text-gray-700 font-semibold cursor-pointer  hover:text-primary-500 hover:transition-colors duration-300">
              {title}
            </h3>
            <div className="text-md font-medium text-primary-500">
              {/* cart price */}
              <span className=" text-gray-700">Price :</span> {price}
            </div>
            <div className="text-md font-medium text-primary-500">
              {/* cart ratig */}
              <span className=" text-gray-700">rating :</span> {ratingsAverage}{" "}
              <i className="fa-solid fa-star text-yellow-400"></i>
            </div>
            <h4 className="  text-gray-500 font-semibold">
              {" "}
              <span>{category.name}</span> |{" "}
              <span>
                {" "}
                {count >= 1 ? (
                  <span className=" text-primary-500 font-medium text-base  ">
                    Available
                  </span>
                ) : (
                  <span className="text-red-600 font-medium text-base  ">
                    Not Available
                  </span>
                )}{" "}
              </span>
            </h4>
          </div>
          {/* counrter */}
          <div className="coun mx-auto my-auto col-span-12 md:col-span-3 h-fit w-fit flex justify-between items-center px-4 gap-6 border-2 border-solid border-primary-500 rounded-full ">
            <i
              onClick={() => {
                if (count > 1) {
                  UpdatCart({
                    productId: id,
                    count: count - 1,
                  });
                }
              }}
              className="fa-solid fa-minus text-lg font-bold cursor-pointer text-gray-600 hover:text-primary-800 hover:transition-all hover:duration-300 hover:rotate-180 duration-300"
            ></i>
            <span className="text-lg font-semibold text-gray-600">{count}</span>
            <i
              onClick={() => {
                UpdatCart({
                  productId: id,
                  count: count + 1,
                });
              }}
              className="fa-solid fa-plus text-lg font-bold cursor-pointer text-gray-600 hover:text-primary-800 hover:transition-all hover:duration-300 hover:rotate-180 duration-300"
            ></i>
          </div>
          <div className="totalPrice col-span-12 md:col-span-2 m-auto text-center ">
            <h3 className="text-lg font-semibold text-gray-600">Total Price</h3>
            <p className="text-md font-bold text-primary-500">
              {" "}
              {price * count} L.E
            </p>
          </div>
          <button
            onClick={() => {
              removProductFromCart({ productId: id });
            }}
            type="submit"
            className=" h-8 m-auto col-span-12 md:col-span-1 my-auto w-8 border-2 group/icon border-transparent rounded-full hover:border-red-600 hover:transition-colors duration-300"
          >
            <i className="fa-solid fa-xmark group-hover/icon:text-red-600 group-hover/icon:rotate-180 group-hover/icon:transition-all group-hover/icon:duration-300 duration-300 "></i>
          </button>
        </div>
      </div>
    </>
  );
}
