import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishContext = createContext(null);
export default function WishListprovider({ children }) {
  const { Token } = useContext(UserContext);
  const [WishListinfo, setWishListinfo] = useState(null);

  async function addWishList({ productId }) {
    let toastid = toast.loading("Adding product to Wish List...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          Token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        getWishList();
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.remove(toastid);
    }
  }

  async function getWishList() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          Token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      setWishListinfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function rmoveWishList({ productId }) {
    let toastid = toast.loading("Deleting product from Wish List...");
    try {
      const options = {
        url: ` https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          Token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setWishListinfo(data);
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.remove(toastid);
    }
  }

  return (
    <WishContext.Provider
      value={{ addWishList, getWishList, WishListinfo, rmoveWishList }}
    >
      {children}
    </WishContext.Provider>
  );
}
