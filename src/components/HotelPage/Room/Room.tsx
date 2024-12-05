import { CartItem, RoomProps, RoomType } from "../../../Types";
import Button from "../../Button/Button";
import "./Room.css";
import { motion } from "motion/react";

const Room: React.FC<RoomProps> = ({ room, addToCart }: RoomProps) => {
  return (
    <motion.div
      className="room"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1, transition: { duration: 0.5 } }}>
      <section className="section-1">
        <div
          className="room-img"
          style={{ backgroundImage: `url(${room?.roomPhotoUrl})` }}></div>
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
              try {
                addToCart({ id: room.roomId, price: room.price });
              } catch (error) {
                alert("You reserved room earlier");
              }
            }}>
            {room.availability ? "Book now" : "not avialable"}
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default Room;
