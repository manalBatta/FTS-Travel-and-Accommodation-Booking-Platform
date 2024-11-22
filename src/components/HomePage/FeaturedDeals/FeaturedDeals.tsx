import { useEffect, useState } from "react";
import { featuredDeals, readFromReader } from "../../../APIs";
import { FeaturedDealType } from "../../../Types";
import FeaturedDeal from "./FeaturedDeal/FeaturedDeal";

const FeaturedDeals = () => {
  const [featuredDealsList, setFeaturedDealsList] = useState<
    FeaturedDealType[]
  >([]);
  const getFeaturedDeals = async () => {
    const response = await featuredDeals();
    const result = await readFromReader(response);
    if (result) setFeaturedDealsList(JSON.parse(result));
  };

  useEffect(() => {
    getFeaturedDeals();
  }, []);
  console.log(JSON.stringify(featuredDealsList));

  return (
    <>
      <article className="result">
        <ul className="result-body">
          {featuredDealsList?.length &&
            featuredDealsList.map((deal) => {
              return (
                // originalRoomPrice: number;
                // discount: number;
                // finalPrice: number;
                // title: string;
                <FeaturedDeal deal={deal} key={deal.hotelId}></FeaturedDeal>
              );
            })}
        </ul>
      </article>
    </>
  );
};

export default FeaturedDeals;
