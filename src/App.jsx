import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Layout from "./components/Layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ProutactedRout from "./components/ProutactedRout/ProutactetRoud";
import GestRout from "./components/GestRout/GestRout";
import Userprovider from "./components/context/User.context";
import Cartprovider from "./components/context/Cart.context";
import Cart from "./pages/cart/Cart";
import PruductDetals from "./pages/prouductDetals/PruductDetals";
import Orders from "./pages/Orders/Orders";
import Product from "./pages/Product/Product";
import CategoryProduct from "./pages/CategoryProduct/CategoryProduct";
import Category from "./pages/Category/Category";
import Brands from "./pages/Brands/Brands";
import BrandProduct from "./pages/BrandProduct/BrandProduct";
import WishList from "./pages/wishList/WishList";
import WishListprovider from "./components/context/WishList.context";
import ForsotPassword from "./pages/ForsotPassword/ForsotPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  // make usestate to save proudact
  const [proudacts, setproudacts] = useState(null);

  async function getproudacts() {
    const options = {
      url: "https://fakestoreapi.com/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setproudacts(data);
  }
  // to call function one time
  useEffect(() => {
    getproudacts();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProutactedRout>
          <Layout />
        </ProutactedRout>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "product/:id",
          element: <PruductDetals />,
        },
        { path: "allorders", element: <Orders /> },
        { path: "allproducts", element: <Product /> },
        { path: "categoryProduct/:id", element: <CategoryProduct /> },
        { path: "categories", element: <Category /> },
        {
          path: "brands",
          element: <Brands />,
        },
        { path: "brandProduct/:id", element: <BrandProduct /> },
        { path: "wishList", element: <WishList /> },
      ],
    },
    {
      path: "/",
      element: (
        <GestRout>
          <Layout />
        </GestRout>
      ),
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "forgot", element: <ForsotPassword /> },
        { path: "verify", element: <VerifyCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);
  return (
    <>
      <Userprovider>
        <WishListprovider>
          <Cartprovider>
            <RouterProvider router={router} />
          </Cartprovider>
        </WishListprovider>
      </Userprovider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
