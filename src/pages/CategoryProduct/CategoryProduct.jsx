import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Loader from "../../components/laoder/loader";
import noproduct from "../../assets/images/no-product-found-DncxVh9z.png";

export default function CategoryProduct() {
  let [CategoryProducts, setCategoryProducts] = useState(null);
  let { id } = useParams();
  async function CategoryProduct() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setCategoryProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    CategoryProduct();
  }, [id]);
  return (
    <>
      {CategoryProducts ? (
        <>
          {CategoryProducts.length === 0 ? (
            <div className={` relative`}>
              <img src={noproduct} alt="" className="w-full" />
            </div>
          ) : (
            <>
              <div className=" space-x-2 space-y-2 px-5 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-1">
                {CategoryProducts.map((products) => (
                  <Card key={products.id} InfoProudact={products} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
