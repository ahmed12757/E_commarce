import { Link, NavLink } from "react-router-dom";
import freshcard from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User.context";
import { CartContext } from "../context/Cart.context";
import { WishContext } from "../context/WishList.context";
export default function Navbar() {
  let [minucase, setminucase] = useState(false);
  const duration = 1000;
  let { Token, logout } = useContext(UserContext);
  let { cartinfo, getproducts } = useContext(CartContext);
  useEffect(() => {
    getproducts();
  }, []);
  const { WishListinfo, getWishList } = useContext(WishContext);
  useEffect(() => {
    getWishList();
  }, []);
  return (
    <>
      <nav
        style={{
          transition: `all ${duration}ms `,
          height: minucase
            ? `530px  ${!Token && "h-[380px]  "}`
            : `lg:h-auto ${!Token && " lg:h-auto"}`,
        }}
        className={`    bg-gray-100 z-50 fixed  py-5 top-0 left-0 right-0 shadow-md  px-4 overflow-hidden ${
          minucase ? `${Token && "h-[430px] lg:h-auto "}` : "h-[65px]"
        } ${minucase ? ` ${!Token && "h-[180px]"}` : "h-[65px]"} `}
      >
        <div className=" container flex justify-between   items-center  relative">
          {/* logo */}
          <Link to="/">
            <img src={freshcard} alt="FreshCard logo" />
          </Link>

          {/* main links */}

          <div className="flex grow lg:ml-10 lg:justify-around  items-center flex-col lg:flex-row gap-10 absolute top-16 left-[50%] -translate-x-1/2 lg:translate-x-0 lg:static ">
            {Token && (
              <>
                <ul className="flex lg:ml-24 justify-between flex-col lg:flex-row items-center gap-5  ">
                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to="/allproducts"
                    >
                      Products
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to={`/categories`}
                    >
                      Categories
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to="/allorders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>
                {/* social media */}

                <div
                  className={`mx-auto w-fit ${
                    !Token && "flex flex-col justify-center items-center"
                  } `}
                >
                  <ul
                    className={`flex mx-auto   items-center justify-center gap-3 ${
                      !Token && "flex mx-auto flex-col lg:flex-row items-center"
                    } `}
                  >
                    <li
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className=" hover:-translate-y-1 hover:transition-transform hover:duration-200  "
                    >
                      <Link to="https://facebook.com" target="_blank">
                        <i className="fa-brands fa-facebook text-blue-500"></i>
                      </Link>
                    </li>

                    <li
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className=" hover:-translate-y-1 hover:transition-transform hover:duration-200  "
                    >
                      <Link to="https://tiktok.com" target="_blank">
                        <i className="fa-brands fa-tiktok "></i>
                      </Link>
                    </li>

                    <li
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className=" hover:-translate-y-1 hover:transition-transform hover:duration-200  "
                    >
                      <Link to="https://instagram.com" target="_blank">
                        <i className="fa-brands fa-instagram text-red-400"></i>
                      </Link>
                    </li>

                    <li
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className=" hover:-translate-y-1 hover:transition-transform hover:duration-200  "
                    >
                      <Link to="https://linkedin.com" target="_blank">
                        <i className="fa-brands fa-linkedin text-blue-500"></i>
                      </Link>
                    </li>

                    <li
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className=" hover:-translate-y-1 hover:transition-transform hover:duration-200  "
                    >
                      <Link to="https://youtube.com" target="_blank">
                        <i className="fa-brands fa-youtube text-red-500"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div
            className={`flex  gap-5 sm:gap-7 justify-between items-center lg:flex-row ${
              !Token && " sm:gap-0 justify-end"
            }`}
          >
            {/* heart icon */}

            {Token && (
              <Link
                to={`wishList`}
                onClick={() => {
                  if (minucase === true) {
                    setminucase(!minucase);
                  }
                }}
                className={`hover:transition-all hover:text-red-600 hover:duration-300 hover:animate-bounce `}
              >
                <i className={`fa-regular fa-heart text-xl font-bold `}></i>
              </Link>
            )}

            {/* cart icon */}

            {Token && (
              <>
                <Link
                  onClick={() => {
                    if (minucase === true) {
                      setminucase(!minucase);
                    }
                  }}
                  to="cart"
                  className=" cursor-pointer cart mx-auto ml-auto relative "
                >
                  <i className="fa-brands fa-opencart text-2xl"></i>
                  <div className=" cart-counter flex items-center justify-center absolute  top-0 right-0 h-6 w-6 rounded-full bg-primary-500 translate-x-1/2 -translate-y-1/2 ">
                    {cartinfo === null ? (
                      <i className="fa-solid fa-spinner rounded-t-sm fa-spin text-white"></i>
                    ) : (
                      <span
                        className={`text-white font-bold ${
                          cartinfo.numOfCartItems >= 1 ? "animate-bounce" : ""
                        }`}
                      >
                        {cartinfo.numOfCartItems}
                      </span>
                    )}
                  </div>
                </Link>
              </>
            )}

            <div
              className={`menulist  ${Token ? "lg:hidden" : "sm:hidden"}`}
              onClick={() => {
                setminucase(!minucase);
              }}
            >
              <i className="fa-solid fa-bars font-bold text-[30px]"></i>
            </div>

            {/* singin icons */}

            <ul
              className={`${
                !Token &&
                "flex  justify-end absolute top-16  left-[50%] -translate-x-3/4 sm:translate-x-0 sm:static  items-center flex-col sm:flex-row gap-5"
              } ${
                Token &&
                " absolute top-[350px] left-[50%] -translate-x-3/4 md:translate-x-0 lg:static "
              }`}
            >
              {!Token && (
                <>
                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to="/login"
                    >
                      login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        if (minucase === true) {
                          setminucase(!minucase);
                        }
                      }}
                      className={({ isActive }) => {
                        return ` relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-primary-400 ${
                          isActive ? "before:!w-full font-bold" : ""
                        } `;
                      }}
                      to="/signup"
                    >
                      signup
                    </NavLink>
                  </li>
                </>
              )}
              {Token && (
                <>
                  <li onClick={logout}>
                    <NavLink to="/login">
                      <i class="fa-solid fa-right-from-bracket text-2xl hover:text-red-600 transition-colors duration-300 "></i>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
