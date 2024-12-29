import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loader from "../../components/laoder/loader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { Token } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  let { id } = jwtDecode(Token);

  async function getOrder() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);

    setOrder(data);
  }
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {order ? (
        <section className=" space-y-4">
          <div className=" flex justify-center items-center">
            <h2 className=" font-bold text-center mx-auto text-lg text-primary-600 border-b-2 border-opacity-30 relative border-primary-500 w-fit mb-5 after:w-3/4 after:bg-primary-500 after:bg-opacity-30 after:mx-auto after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:absolute after:h-[2px] after:block ">
              Your Orders
            </h2>
          </div>
          {order.length == 0 ? (
            <div className="py-6 rounded-lg flex flex-col justify-center items-center gap-3 border-2 border-primary-500">
              <h2>There are not items yet.</h2>
              <Link
                to="/allproducts"
                className="btn font-medium text-center  px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 hover:duration-300 hover:transition-colors "
              >
                Make your first order
              </Link>
            </div>
          ) : (
            <div>
              {order.map((order) => (
                <div
                  key={order.id}
                  className="order p-4  border-2 border-gray-400 border-opacity-25 rounded-lg  "
                >
                  <header className="flex justify-between items-center">
                    <div>
                      <h2 className=" text-gray-500">Order ID</h2>
                      <span className=" text-gray-700 text-lg font-semibold">
                        #125545
                      </span>
                    </div>
                    <div>
                      {order.isPaid ? (
                        <span className=" font-cairo inline-block px-3 py-1 bg-primary-500 font-semibold text-white rounded-full">
                          تم الدفع
                        </span>
                      ) : (
                        <span className=" font-cairo inline-block px-3 py-1 bg-red-500 font-semibold text-white rounded-full">
                          غير مدفوع
                        </span>
                      )}
                      {order.isDelivered ? (
                        <span className=" font-cairo inline-block px-3 ml-2 py-1 bg-primary-500 font-semibold  text-white rounded-full">
                          تم التوصيل
                        </span>
                      ) : (
                        <span className=" font-cairo inline-block px-3 ml-2 py-1 bg-blue-500 font-semibold  text-white rounded-full">
                          قيد التوصيل
                        </span>
                      )}
                    </div>
                  </header>
                  <div className=" grid space-y-4 md:gap-3 my-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    {order.cartItems.map((cartItem) => (
                      <div
                        key={cartItem._id}
                        className="bruduct-item !my-0 h-fit shadow-xl border-2 border-gray-400 border-opacity-30  overflow-hidden rounded-lg "
                      >
                        <img
                          className="w-full "
                          src={cartItem.product.imageCover}
                          alt=""
                        />
                        <div className="p-4">
                          <h3 className="text-lg hover:text-primary-500 hover:transition-colors hover:duration-300 my-4 text-gray-600 font-bold line-clamp-1">
                            <Link to={`/product/${cartItem.product.id}`}>
                              {cartItem.product.title}
                            </Link>
                          </h3>
                          <div className=" flex justify-between items-center ">
                            <p>
                              {" "}
                              <span className=" font-semibold text-primary-500 text-lg">
                                count :
                              </span>{" "}
                              {cartItem.count}
                            </p>
                            <span className="font-semibold text-lg">
                              {cartItem.price} L.E
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className=" border-2 border-primary-500 font-semibold  text-lg   rounded-lg px-2 w-fit ">
                      Your Total Order Price :{" "}
                      <span className="text-primary-500 font-semibold  text-lg ">
                        {" "}
                        {order.totalOrderPrice}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
