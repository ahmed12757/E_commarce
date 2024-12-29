import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

// !name of context
export const CartContext = createContext(null);
export default function Cartprovider({ children }) {
  // !coal token from dage usercontext
  const { Token } = useContext(UserContext);
  const [cartinfo, setcartinfo] = useState(null);

  // & fumction to add products
  async function addProductToCart({ productId }) {
    let toastid = toast.loading("Adding product to cart...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
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
        getproducts();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastid);
    }
  }

  // & fumction to get products

  async function getproducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          Token,
        },
      };
      let { data } = await axios.request(options);

      setcartinfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  // & fumction to remov products

  async function removProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting product...");
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          Token,
        },
      };
      let { data } = await axios.request(option);
      if (data.status === "success") {
        setcartinfo(data);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.remove(toastId);
    }
  }

  // & fumction to clear Cart
  async function clearCart() {
    let toastId = toast.loading("clear cart...");
    try {
      const optinos = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          Token,
        },
      };
      let { data } = await axios.request(optinos);
      if (data.message === "success") {
        setcartinfo({
          numOfCartItems: 0,
        });
        toast.success("cart has been cleared");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.remove(toastId);
    }
  }

  // & fumction to Updat Cart
  async function UpdatCart({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          Token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setcartinfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getproducts,
        cartinfo,
        removProductFromCart,
        clearCart,
        UpdatCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
