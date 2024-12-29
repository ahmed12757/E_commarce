import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/context/Cart.context";
import Loader from "../../components/laoder/loader";
import CartItem from "../../components/cartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../../components/context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Element, animateScroll as scroll } from "react-scroll";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getproducts, cartinfo, clearCart } = useContext(CartContext);
  const { Token } = useContext(UserContext);
  const Navigate = useNavigate();
  const [paymentMethod, setpaymentMethod] = useState(null);

  async function CheckOut(values) {
    let toastId = toast.loading("We arc Creating Your Order...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartinfo.cartId}`,
        method: "POST",
        headers: {
          Token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Your order has been created");
        setTimeout(() => {
          Navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.remove(toastId);
    }
  }
  async function onLinePayment(values) {
    let toastId = toast.loading("We arc Creating Your Order...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartinfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          Token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Redirecting to payment page");

        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.remove(toastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod === "cach") CheckOut(values);
      else {
        onLinePayment(values);
      }
    },
  });

  useEffect(() => {
    getproducts();
  }, [paymentMethod]);
  return (
    <>
      <Helmet>
        <title>Cart </title>
      </Helmet>
      {cartinfo === null ? (
        <Loader />
      ) : (
        <section className=" container space-y-4 px-3">
          <div className=" flex justify-between items-center">
            <div className=" flex  gap-6 items-center ">
              <i className="fa-brands fa-opencart text-3xl text-primary-500 font-semibold"></i>
              <h2 className=" text-lg text-gray-600 font-semibold relative before:absolute before:w-0.5 before:h-full before:bg-gray-600 before:-left-3 before:bottom-0 ">
                {" "}
                your shoping cart
              </h2>
            </div>
            <Button
              to="CheckOut"
              smooth={true}
              duration={1000}
              className="btn bg-primary-500 mx-0 hover:bg-primary-700 rounded-xl"
            >
              Check Out
            </Button>
          </div>
          {cartinfo.numOfCartItems === 0 ? (
            <div className="py-6 rounded-lg flex flex-col justify-center items-center gap-3 border-2 border-primary-500">
              <h2>There are not items yet.</h2>
              <Link
                to="/allproducts"
                className="btn font-medium text-center  px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 hover:duration-300 hover:transition-colors "
              >
                Add your first product to cart
              </Link>
            </div>
          ) : (
            <>
              <div className=" space-y-4 border-2 border-primary-500 py-4 rounded-lg ">
                {cartinfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
                <div className="flex justify-between  px-3 flex-col sm:flex-row space-y-3 items-center">
                  <div className="totalPrice w-full border-2 border-primary-500 sm:w-fit justify-center rounded-xl  flex items-center  px-8 gap-2 col-span-12 md:col-span-2  text-center ">
                    <h3 className="text-lg font-semibold text-gray-600">
                      Total Price :
                    </h3>
                    <p className="text-md font-bold text-primary-500">
                      {cartinfo.data.totalCartPrice} L.E
                    </p>
                  </div>

                  <button
                    onClick={clearCart}
                    className="btn rounded-lg mx-0 w-full sm:w-fit "
                  >
                    clear cart
                  </button>
                </div>
                <Element name="CheckOut">
                  <div id="CheckOut">
                    <div className=" flex justify-center items-center">
                      <h2 className=" text-center py-4 w-[25%] text-primary-900 font-bold text-lg my-3 border-y-2 border-primary-500">
                        Check Out
                      </h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="cyty mt-5 flex justify-center items-center">
                        <input
                          type="text"
                          className="form-control w-[70%] mx-auto"
                          placeholder="cyty"
                          name="shippingAddress.city"
                          value={formik.values.shippingAddress.city}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="phon mt-5 flex justify-center items-center">
                        <input
                          type="tel"
                          className="form-control w-[70%] mx-auto"
                          placeholder="your phone"
                          value={formik.values.shippingAddress.phone}
                          onChange={formik.handleChange}
                          name="shippingAddress.phone"
                        />
                      </div>
                      <div className=" details mt-5 flex justify-center items-center">
                        <textarea
                          name="shippingAddress.details"
                          value={formik.values.shippingAddress.details}
                          onChange={formik.handleChange}
                          className="form-control w-[70%] mx-auto"
                          placeholder="details"
                        ></textarea>
                      </div>
                      <div className="flex my-3 flex-col sm:flex-row space-y-3 justify-around px-6  items-center">
                        <button
                          onClick={() => {
                            setpaymentMethod("cach");
                          }}
                          type="submit"
                          className="btn w-[70%] sm:w-fit  rounded-xl bg-primary-500 hover:bg-primary-700 hover:transition-colors hover:duration-300"
                        >
                          {" "}
                          cash order{" "}
                        </button>
                        <button
                          onClick={() => {
                            setpaymentMethod("onLine");
                          }}
                          type="submit"
                          className="btn px-2 w-[70%] sm:w-fit  rounded-xl bg-primary-500 hover:bg-primary-700 hover:transition-colors hover:duration-300"
                        >
                          {" "}
                          online payment{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </Element>
              </div>
              <Link to={`checkout`}></Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
