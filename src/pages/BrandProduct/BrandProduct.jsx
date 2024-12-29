import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import Loader from "../../components/laoder/loader";
import noproduct from "../../assets/images/no-product-found-DncxVh9z.png";
import axios from "axios";

export default function BrandProduct() {
  let [Brandproduct, setBrandproduct] = useState(null);
  let { id } = useParams();
  async function BrandProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data);
      setBrandproduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    BrandProducts();
  }, [id]);
  return (
    <>
      {" "}
      {Brandproduct ? (
        <>
          {Brandproduct.length === 0 ? (
            <div className={` relative`}>
              <img src={noproduct} alt="" className="w-full" />
            </div>
          ) : (
            <>
              <div className=" space-x-2 space-y-2 px-5 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-1">
                {Brandproduct.map((products) => (
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
