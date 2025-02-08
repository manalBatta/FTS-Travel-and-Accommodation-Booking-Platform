import "./HotelCard.css";
import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { Amenity, Hotel } from "../../Types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { memo } from "react";

interface HotelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hotel: Hotel;
}
const HotelCard = memo(({ hotel }: HotelCardProps) => {
  return (
    <li className="hotel" key={hotel?.hotelId?.toString()}>
      <img
        src={hotel?.roomPhotoUrl || hotel?.thumbnailUrl || "/default.jpg"}
        alt="Hotel gallery"
        className="hotel-img"
      />
      <h3 className="hotel-name">{hotel?.hotelName || hotel.description}</h3>
      <Button>
        <Link to={`/hotels/${hotel?.hotelId}`}>Book now</Link> 
      </Button>
      <h4 className="hotel-location">
        <IoLocationOutline style={{ fontSize: "1rem" }} />
        {hotel?.cityName}
      </h4>
      <span className="hotel-amenities">
        {hotel?.amenities
          ?.map((amenity: Amenity) => amenity.name)
          .join(" • ") || hotel?.visitDate}
      </span>

      <h5 className="rate">
        {hotel?.starRating?.toString()}
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <IoMdStar
              key={index}
              style={{
                color: index < hotel.starRating ? "gold" : "#2b67f61f",
              }}
            />
          ))}
      </h5>
      <h6 className="price">
        {hotel?.roomPrice?.toString() || ` ${hotel?.priceUpperBound} - `}
        {hotel?.priceLowerBound || ""}
        <span className="note">/night</span>
      </h6>
    </li>
  );
});

export default HotelCard;
