import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Online from "../Online/Online";
import wifi from "../../assets/images/wifi-exclamation-svgrepo-com.svg";
import Offline from "../offLine/offLine";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <Online>
        <div className=" container px-3 pb-10 pt-24">
          <Outlet></Outlet>
        </div>
      </Online>
      <Offline>
        <section className="my-32">
          <div className=" flex flex-col justify-center items-center space-y-4 ">
            <img src={wifi} alt="" />
            <div>
              <h2 className=" text-primary-900 font-bold text-center text-lg">
                Whoopps!
              </h2>
              <p className=" text-primary-950 font-semibold text-center">
                No internet connection found.
              </p>
              <p className="text-primary-950 font-semibold text-center">
                Please check your connection or try again
              </p>
            </div>
          </div>
        </section>
      </Offline>
      <Footer />
    </div>
  );
}
