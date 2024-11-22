import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { FeaturedDealType } from "../../../../Types";
import "./FeaturedDeal.css";
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  deal: FeaturedDealType;
}
const FeaturedDeal: React.FC<MyComponentProps> = (props) => {
  const deal = props.deal;
  return (
    <li className="deal" key={deal?.hotelId?.toString()}>
      <img
        src={deal.roomPhotoUrl || "/default.jpg"}
        alt="deal gallery"
        className="deal-img"
      />
      <h3 className="deal-name">{deal.hotelName}</h3>
      <button className="like-btn ">
        <IoHeartOutline />
      </button>
      <h4 className="deal-location">
        <IoLocationOutline style={{ fontSize: "1rem" }} />
        {deal.cityName}
      </h4>
      <span className="deal-amenities">{deal?.description}</span>

      <h5 className="rate">
        {deal?.hotelStarRating?.toString()}
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <IoMdStar
              key={index}
              style={{
                color: index < deal.hotelStarRating ? "gold" : "#2b67f61f",
              }}
            />
          ))}
      </h5>
      <h6 className="price">
        ${deal?.finalPrice?.toString()}
        <span className="note">/night</span>
      </h6>
    </li>
  );
};

export default FeaturedDeal;
