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
import useHotelDetails from "./getHotelsHook";

const HotelPage = () => {
  const hotelDetails = useHotelDetails();

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
