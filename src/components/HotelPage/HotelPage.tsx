import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hotel, hotelGallery, readFromReader } from "../../APIs";
import { Hotel, initialHotel } from "../../Types";
import Navbar from "../HomePage/Navbar/Navbar";
import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";

import "./HotelPage.css";
import Gallery from "./Gallery/Gallery";

const HotelPage = () => {
  const [hotelDetails, setHotelDetails] = useState<Hotel>(initialHotel);
  const location = useLocation();

  const getHotelDetails = async () => {
    const hotelId = +location.pathname.slice(8);
    const response = await hotel(hotelId);
    const result = await readFromReader(response);
    //get gallery
    const response2 = await hotelGallery(hotelId);
    const gallery = await readFromReader(response2);

    if (result && gallery) {
      try {
        const galleryContent = gallery.trim();

        const galleryArray = galleryContent.match(/\[(.*?)\]/);
        if (galleryArray && galleryArray[1]) {
          const items = galleryArray[1]
            .split("},")
            .map((item) => JSON.parse(item.endsWith("}") ? item : item + "}"));

          console.log("Parsed gallery items:", items);

          setHotelDetails({
            ...JSON.parse(result),
            gallery: items,
          });
        } else {
          console.error("Gallery format is invalid:", gallery);
        }
      } catch (error) {
        console.error("Error processing gallery or result:", error);
      }
    } else {
      console.warn("Missing required data: result or gallery is undefined.");
    }
  };

  useEffect(() => {
    getHotelDetails();
  }, [location]);

  return (
    <div className="hotel-container">
      <Navbar></Navbar>
      <h1 className="hotel-name">
        {hotelDetails?.hotelName}
        <span className="hotel-location">
          <IoLocationOutline style={{ fontSize: "1.1rem" }} />
          {hotelDetails?.location}
        </span>
      </h1>
      <h2 className="rate">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <IoMdStar
              key={index}
              style={{
                color: index < hotelDetails?.starRating ? "gold" : "#2b67f61f",
              }}
            />
          ))}
      </h2>

      <Gallery gallery={hotelDetails.gallery} columns={3} />
    </div>
  );
};
export default HotelPage;
