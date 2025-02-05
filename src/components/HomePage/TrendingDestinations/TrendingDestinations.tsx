import { IoLocationOutline } from "react-icons/io5";
import { Destination } from "../../../Types";
import { readFromReader, trendingDestinations } from "../../../APIs";
import { memo, useEffect, useState } from "react";
import "./TrendingDestinations.css";
import { motion } from "framer-motion";




const TrendingDestinations = memo(() => {
  const [trendingDestinationsList, setTrendingDestinationsList] = useState<
    Destination[]
  >([]);
  const getTrendingDestinations = async () => {
    try {
      const response = await trendingDestinations();
      const result = await readFromReader(response);
      if (result) setTrendingDestinationsList(JSON.parse(result));
    } catch (error) {
      console.log("Failed to fetch trending destinations");
    }
  };
  useEffect(() => {
    getTrendingDestinations();
  }, []);
  return (
    <ul className="destinations-container" id="Trending">
      <li>
        <h1 className="detonations-header">Trending Destinations</h1>
      </li>
      {(trendingDestinationsList?.length &&
        trendingDestinationsList.map((destination: Destination) => {
          return (
            <motion.li
              className="destination"
              // style={{ backgroundImage: `url(${destination.thumbnailUrl})` }}
              key={destination?.cityId?.toString()}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.5 },
              }}
            >
              <img
                src={destination?.thumbnailUrl || "/default.jpg"}
                alt="destination gallery"
                className="destination-img"
              />
              <h3 className="destination-name">
                <motion.div
                  whileInView={{
                    scale: 1.2,
                    transition: { duration: 2.5 },
                  }}
                >
                  <IoLocationOutline />
                </motion.div>
                {destination?.cityName}
              </h3>

              <h4 className="destination-location">
                {destination?.countryName}
              </h4>
              <h5 className="destination-description">
                {destination?.description}
              </h5>
            </motion.li>
          );
        })) || <img src="/Empty.svg" alt="loading" className="loading" />}
    </ul>
  );
});

export default TrendingDestinations;
