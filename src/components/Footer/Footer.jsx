import amazon from "../../assets/images/amazon-pay.png";
import american from "../../assets/images/American-Express-Color.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import applestore from "../../assets/images/get-apple-store.png";
import googleplay from "../../assets/images/get-google-play.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 py-8 px-4 ">
        <div className="container space-y-5">
          <div className="">
            <h2 className=" text-xl font-semibold text-slate-800">
              Get the freshcart app
            </h2>
            <p className=" text-slate-400">
              We will send you a link , open it on your phone to download the
              app
            </p>
          </div>
          <div className=" space-y-3">
            <form className=" gap-1 grid grid-cols-12 ">
              <input
                className="form-control grow border-[.5px] col-span-12  lg:col-span-9"
                type="email"
                placeholder="Email"
              />
              <button
                className="btn  bg-primary-500 w-full lg:w-fit col-span-12  lg:col-span-3 hover:bg-primary-700 rounded-lg "
                type="supmet"
              >
                share app link
              </button>
            </form>
          </div>
          <div className="flex justify-between items-center py-4 border-y-2 border-slate-400 border-opacity-20 flex-col 2xl:flex-row">
            <div className="payment items-center grid grid-cols-12 ">
              <h3 className="  col-span-12 md:col-span-4 text-center font-bold   ">
                payment partners
              </h3>
              <img
                className="w-24 col-span-3 md:col-span-2 "
                src={amazon}
                alt=""
              />
              <img
                className="w-24 col-span-3 md:col-span-2 "
                src={american}
                alt=""
              />
              <img
                className="w-20 col-span-3 md:col-span-2 "
                src={mastercard}
                alt=""
              />
              <img
                className="w-24 col-span-3 md:col-span-2 "
                src={paypal}
                alt=""
              />
            </div>
            <div className="downloade   grid grid-cols-12 gap-3   py-3">
              <div className=" md:col-span-2"></div>
              <h3 className=" lg:ml-auto col-span-12 md:col-span-4 text-center font-bold align-middle  ">
                Get deliveries with freshcart
              </h3>
              <div className=" col-span-12 md:mr-auto  md:col-span-3 flex justify-center items-center ">
                <img className="w-[100px]  " src={googleplay} alt="" />
                <img className="w-24 " src={applestore} alt="" />
              </div>
              <div className=" md:col-span-2"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
