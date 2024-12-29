import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/laoder/loader";
import axios from "axios";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  const [proudacts, setproudacts] = useState(null);
  async function getproudacts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setproudacts(data.data);
  }
  useEffect(() => {
    getproudacts();
  }, []);
  return (
    <div>
      <Helmet>
        <title> Home Page</title>
      </Helmet>
      <HomeSlider />
      <CategorySlider />
      {!proudacts ? (
        <Loader />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5">
          {proudacts.map((proudact, index) => (
            <Card key={proudact.id} InfoProudact={proudact} />
          ))}
        </div>
      )}
    </div>
  );
}
