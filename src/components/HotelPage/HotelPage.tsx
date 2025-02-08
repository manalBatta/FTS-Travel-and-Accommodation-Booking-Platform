import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hotel, hotelGallery, readFromReader } from "../../services/APIs";
import { Hotel, initialHotel } from "../../Types";
import Navbar from "../HomePage/Navbar/Navbar";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import "./HotelPage.css";
import Gallery from "./Gallery/Gallery";
import MapWithDynamicData from "./Map/Map";
import Rooms from "./Rooms/Rooms";
import Reviews from "./Reviews/Reviews";

const HotelPage = () => {
  const [hotelDetails, setHotelDetails] = useState<Hotel>(initialHotel);
  const location = useLocation();

  const getHotelDetails = async () => {
    const hotelId = +location.pathname.slice(8);

    const response = await hotel(hotelId);

    if (response.status !== 200) {
      console.error("Error fetching hotel details:", response);
      return;
    }

    console.log("body", response.body);

    const result = await readFromReader(response); //ready to show

    //get gallery
    const response2 = await hotelGallery(hotelId);

    if (response2.status !== 200) {
      if (result)
        setHotelDetails({
          ...JSON.parse(result),
          gallery: [],
        });
      console.error("Error fetching hotel gallery:", response2);
      return;
    }

    const gallery = await readFromReader(response2); //ready to show

    if (result && gallery) {
      try {
        //parse gallery
        const galleryContent = gallery.trim();

        const galleryArray = galleryContent.match(/\[(.*?)\]/);

        if (galleryArray && galleryArray[1]) {
          const items = galleryArray[1]
            .split("},")
            .map((item) => JSON.parse(item.endsWith("}") ? item : item + "}"));

          setHotelDetails({
            ...JSON.parse(result),
            gallery: items,
          });
        } else {
          console.error("Gallery format is invalid:", gallery);
          setHotelDetails({
            ...JSON.parse(result),
            gallery: [],
          });
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
      <Navbar
        navItems={[
          { name: "Gallery", link: "#" },
          { name: "Description", link: "#Description" },
          { name: "Available Rooms", link: "#AvailableRooms" },
          { name: "Rating & Reviews", link: "#RatingReviews" },
        ]}
      ></Navbar>
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

      {hotelDetails.gallery.length > 0 ? (
        <Gallery gallery={hotelDetails.gallery} columns={3} />
      ) : (
        <img
          src="/Empty.svg"
          alt="loading"
          className="loading"
          width={500}
          height={500}
        />
      )}
      <MapWithDynamicData
        latitude={hotelDetails.latitude}
        longitude={hotelDetails.longitude}
        hotelName={hotelDetails.hotelName}
        description={hotelDetails.description}
      ></MapWithDynamicData>

      <Rooms hotelName={hotelDetails.hotelName}></Rooms>

      <Reviews></Reviews>
    </div>
  );
};
export default HotelPage;
