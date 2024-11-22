import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { FeaturedDealType } from "../../../../Types";
import "./FeaturedDeal.css";
import { motion } from "motion/react";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  deal: FeaturedDealType;
}
const FeaturedDeal: React.FC<MyComponentProps> = (props) => {
  const deal = props.deal;

  return (
    <motion.li
      className="deal"
      key={deal?.hotelId?.toString()}
      whileHover={{ scale: 1.01 }}>
      <img
        src={deal.roomPhotoUrl || "/default.jpg"}
        alt="deal gallery"
        className="deal-img"
      />
      <h3 className="deal-name">
        <span style={{ fontSize: "1.6rem" }}>{deal.hotelName}</span>
        <motion.div
          className="discount-label red"
          whileInView={{
            scale: 1.2,
            transition: { duration: 2.2 },
          }}>
          <span>{deal.discount * 100}%</span>
        </motion.div>
      </h3>
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
        <br />
        <span className="original-price">
          ${deal?.originalRoomPrice?.toString()}
        </span>
        <span className="note">/night</span>
      </h6>
    </motion.li>
  );
};

export default FeaturedDeal;
