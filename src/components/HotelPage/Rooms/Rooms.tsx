import { useLocation } from "react-router-dom";
import "./Rooms.css";
import { useContext, useEffect, useState } from "react";
import {
  RoomType,
  SearchDetails,
  SearchDetailsInitialValue,
} from "../../../Types";
import {
  hotelAvailableRooms,
  hotelRooms,
  readFromReader,
} from "../../../services/APIs";
import Room from "../Room/Room";
import { motion } from "motion/react";
import Button from "../../Button/Button";
import { CartContext } from "../../../context/cart";
import Cart from "../../Cart/Cart";

type RoomsProps = {
  hotelName: string;
};
const Rooms = ({ hotelName }: RoomsProps) => {
  const [roomsList, setRoomsList] = useState<RoomType[]>([]);
  const [filterRooms, setFilterRooms] = useState<SearchDetails>({
    ...SearchDetailsInitialValue,
    children: 5,
    adults: 5,
  });
  const location = useLocation();
  let hotelId;

  const getAllRooms = async () => {
    hotelId = +location.pathname.slice(8);
    const response = await hotelRooms(
      hotelId,
      filterRooms.checkInDate,
      filterRooms.checkOutDate
    );
    const result = await readFromReader(response);
    if (result) setRoomsList(JSON.parse(result));
  };

  const getAvailableRooms = async () => {
    hotelId = +location.pathname.slice(8);
    const response = await hotelAvailableRooms(hotelId);
    const result = await readFromReader(response);
    if (result) setRoomsList(JSON.parse(result));
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  //console.log(hotelId);
  //console.log(filterRooms);
  //console.log(addToCart);
  return (
    <article className="available-rooms-con" id="AvailableRooms">
      <Cart></Cart>
      <motion.h4
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        Available Rooms
      </motion.h4>
      <section className="header">
        <div className="search-details">
          <h2>Adults </h2>
          <input
            className="guests"
            type="number"
            min={1}
            max={5}
            placeholder="Adults"
            value={filterRooms.adults}
            onChange={(event) =>
              setFilterRooms((prev) => {
                return { ...prev, adults: +event.target.value };
              })
            }
          />
        </div>
        <div className="search-details">
          <h2>Children</h2>
          <input
            type="number"
            min={1}
            max={5}
            className="guests"
            placeholder="children"
            value={filterRooms.children}
            onChange={(event) =>
              setFilterRooms((prev) => {
                return { ...prev, children: +event.target.value };
              })
            }
          />
        </div>

        <div className="search-details">
          <h2>check-in</h2>
          <input
            className="date"
            type="date"
            placeholder="check-in"
            value={filterRooms.checkInDate}
            onChange={(event) => {
              setFilterRooms((prev) => {
                return { ...prev, checkInDate: event.target.value };
              });
              getAllRooms();
            }}
          />
        </div>
        <div className="search-details">
          <h2>check-out</h2>
          <input
            className="date"
            type="date"
            placeholder="check-out"
            value={filterRooms.checkOutDate}
            onChange={(event) => {
              setFilterRooms((prev) => {
                return { ...prev, checkOutDate: event.target.value };
              });
              getAllRooms();
            }}
          />
        </div>
        <Button>
          <span onClick={getAllRooms}>All Rooms</span>
        </Button>
        <Button>
          <span onClick={getAvailableRooms}>Available Rooms</span>
        </Button>
      </section>
      <section className="rooms">
        {roomsList?.length &&
          roomsList.map((room) => {
            if (
              filterRooms.adults < room.capacityOfAdults ||
              filterRooms.children < room.capacityOfChildren
            )
              return "";
            return (
              <Room
                key={room.roomId}
                room={room}
                hotelName={hotelName}
                details={false}
              ></Room>
            );
          })}
      </section>
    </article>
  );
};

export default Rooms;
