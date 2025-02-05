import { memo, useEffect, useState } from "react";
import { featuredDeals, readFromReader } from "../../../APIs";
import { FeaturedDealType } from "../../../Types";
import FeaturedDeal from "./FeaturedDeal/FeaturedDeal";
import "./FeaturedDeals.css";
import { get } from "http";

const FeaturedDeals = memo(() => {
  const [featuredDealsList, setFeaturedDealsList] = useState<
    FeaturedDealType[]
  >([]);

  const getFeaturedDeals = async () => {
    try {
      const response = await featuredDeals();
      const result = await readFromReader(response);
      if (result) setFeaturedDealsList(JSON.parse(result));
    } catch (error) {
      console.error("Failed to fetch featured deals");
    }
  };

  useEffect(() => {
    getFeaturedDeals();
  }, []);

  return (
    <>
      <article className="result">
        <h1 className="result-header">Featured Deals </h1>
        <ul className="result-body">
          {(featuredDealsList?.length &&
            featuredDealsList.map((deal, index) => {
              if (index >= 3) return "";
              return (
                <FeaturedDeal deal={deal} key={deal.hotelId}></FeaturedDeal>
              );
            })) || <img src="/Empty.svg" alt="loading" className="loading" />}
        </ul>
      </article>
    </>
  );
});

export default FeaturedDeals;
