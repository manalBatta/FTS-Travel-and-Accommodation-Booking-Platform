import { useEffect, useState } from "react";
import { featuredDeals, readFromReader } from "../../../APIs";
import { FeaturedDealType } from "../../../Types";
import FeaturedDeal from "./FeaturedDeal/FeaturedDeal";
import "./FeaturedDeals.css";

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
        <h1 className="result-header">Featured Deals </h1>
        <ul className="result-body">
          {featuredDealsList?.length &&
            featuredDealsList.map((deal, index) => {
              if (index >= 3) return "";
              return (
                <FeaturedDeal deal={deal} key={deal.hotelId}></FeaturedDeal>
              );
            })}
        </ul>
      </article>
    </>
  );
};

export default FeaturedDeals;
