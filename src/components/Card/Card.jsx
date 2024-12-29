import { useContext } from "react";
import { CartContext } from "../context/Cart.context";
import { Link } from "react-router-dom";
import { WishContext } from "../context/WishList.context";

export default function Card({ InfoProudact }) {
  // ^ make distractor to information proudact
  const {
    imageCover,
    price,
    title,
    ratingsAverage,
    description,
    category,
    id,
  } = InfoProudact;
  let name;
  if (category) {
    name = category.name;
  }

  // !coal addProductToCart from dage CartContext
  const { addProductToCart } = useContext(CartContext);
  const { addWishList } = useContext(WishContext);

  return (
    <div className="!m-1 space-y-2">
      <div className="card border-2 border-gray-400 border-opacity-30 group/card rounded-lg overflow-hidden shadow-lg ">
        <div className="relative  overflow-hidden">
          <img
            src={imageCover}
            alt=""
            className="w-full h-[250px] object-cover"
          />

          {/* layer  */}

          <div className="layer group-hover/card:transition-[bottom] group-hover/card:duration-500 group-hover/card:bottom-0 gap-4 flex justify-center items-center absolute  left-0 -bottom-[100%] w-full h-full  ">
            {/* icons */}
            <div
              onClick={() => {
                addWishList({ productId: id });
              }}
              className={` heart cursor-pointer w-8 h-8 rounded-full bg-primary-500 flex justify-center items-center`}
            >
              <i className={` fa-solid fa-heart text-white `}></i>
            </div>

            <div
              // send id to function
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="cart-shopping cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="eye cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="px-3 space-y-3 ">
          <header className=" ">
            <h3 className="text-lg cursor-pointer hover:text-primary-500 hover:transition-colors hover:duration-300 text-gray-600 font-semibold line-clamp-1">
              <Link to={`/product/${id}`}>{title}</Link>
            </h3>
            <h4 className="text-primary-400 font-semibold line-clamp-1 ">
              {name}
            </h4>
          </header>
          <p className="text-sm line-clamp-2 text-gray-400">{description}</p>
          <div className="price py-3 flex justify-between items-center px-1">
            <span>{price} L.E</span>
            <div className="">
              <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
              <span>{ratingsAverage} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
