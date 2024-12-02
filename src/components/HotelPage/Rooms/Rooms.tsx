import { useLocation } from "react-router-dom";
import "./Rooms.css";
import { useEffect, useState } from "react";
import { RoomType } from "../../../Types";
import { hotelAvailableRooms, hotelRooms, readFromReader } from "../../../APIs";
import Room from "../Room/Room";
import { motion } from "motion/react";
import Button from "../../Button/Button";

const Rooms = () => {
  const [roomsList, setRoomsList] = useState<RoomType[]>([]);
  const location = useLocation();
  let hotelId;

  const getAllRooms = async () => {
    hotelId = +location.pathname.slice(8);
    const response = await hotelRooms(hotelId);
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
  return (
    <article className="available-rooms-con">
      <section className="header">
        <motion.h4
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}>
          Available Rooms
        </motion.h4>
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
            return <Room key={room.roomId} {...room}></Room>;
          })}
      </section>
    </article>
  );
};

export default Rooms;
