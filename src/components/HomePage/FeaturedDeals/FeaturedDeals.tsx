import { useEffect, useState } from "react";
import { featuredDeals, readFromReader } from "../../../APIs";
import { FeaturedDealType } from "../../../types";

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

  return <></>;
};

export default FeaturedDeals;
