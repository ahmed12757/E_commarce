import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/laoder/loader";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

export default function Product() {
  const [proudacts, setproudacts] = useState(null);
  async function getallproudacts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setproudacts(data.data);
  }
  useEffect(() => {
    getallproudacts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {!proudacts ? (
        <Loader />
      ) : (
        <div>
          <div className=" flex justify-center items-center">
            <h2 className=" font-bold text-center mx-auto text-lg text-primary-600 border-b-2 border-opacity-30 relative border-primary-500 w-fit mb-5 after:w-3/4 after:bg-primary-500 after:bg-opacity-30 after:mx-auto after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:absolute after:h-[2px] after:block ">
              Products
            </h2>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5">
            {proudacts.map((proudacts) => (
              <Card key={proudacts.id} InfoProudact={proudacts} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
