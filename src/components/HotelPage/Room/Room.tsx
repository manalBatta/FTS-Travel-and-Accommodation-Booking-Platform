import { RoomProps, RoomType } from "../../../Types";
import Button from "../../Button/Button";
import "./Room.css";
import { motion } from "motion/react";
import { MdOutlineCancel } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../../context/cart";

const Room: React.FC<RoomProps> = ({ room, hotelName, details }: RoomProps) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <motion.div
      className="room"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1, transition: { duration: 0.5 } }}>
      <section className="section-1">
        <div
          className="room-img"
          style={{ backgroundImage: `url(${room?.roomPhotoUrl})` }}>
          {details && <h1 className="hotel-name">{hotelName}</h1>}
        </div>
      </section>
      <section className="section-2">{room?.roomType} room</section>
      <section className="section-3">
        <div className="amenities">
          <h1 className="font">Amenities</h1>
          <ul>
            {room?.roomAmenities.map((amenity) => (
              <li key={amenity.name}>{amenity.name}</li>
            ))}
          </ul>
        </div>
        <div className="guests">
          <h1 className="font">Gusts</h1>
          <ul>
            <li>Adults:{room?.capacityOfAdults}</li>
            <li>Children:{room?.capacityOfChildren}</li>
          </ul>
        </div>
        <div className="price">
          <h3>{room?.price}$/night </h3>
          <Button
            disabled={room.availability}
            handleClick={() => {
              if (details) {
                removeFromCart(room.roomId);
                window.location.reload();
              } else
                try {
                  if (addToCart && hotelName) addToCart(room.roomId, hotelName);
                } catch (error) {
                  alert("You reserved room earlier");
                }
            }}>
            {details ? (
              <>
                <MdOutlineCancel size={20} />
                cancel
              </>
            ) : room.availability ? (
              "Book now"
            ) : (
              "not avialable"
            )}
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default Room;
