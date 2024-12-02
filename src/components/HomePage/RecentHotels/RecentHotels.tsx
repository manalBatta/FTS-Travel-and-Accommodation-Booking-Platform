import { useEffect, useState } from "react";
//import { useAuth } from "../../context/auth";
import { readFromReader, recentHotels } from "../../../APIs";
import { Auth, Hotel } from "../../../Types";
import HotelCard from "../../HotelCard/HotelCard";
import { getUser } from "../../../Helpers";
import "./RecentHotels.css";
const RecentHotels = () => {
  const [recentHotelsList, setRecentHotelsList] = useState<Hotel[]>([]);

  //console.log(decoded);
  //console.log("from Recent Hotels in Home page  the user Id=", authentication);

  const getRecent = async (authentication: number) => {
    const response = await recentHotels(authentication);
    const result = await readFromReader(response);
    if (result) setRecentHotelsList(JSON.parse(result));
  };

  useEffect(() => {
    const user: Auth = getUser();
    getRecent(+user.user_id);
  }, []);

  //console.log("hello", recentHotelsList);
  return (
    <ul className="Recent-container" id="Recently">
      <li>
        <h1 className="Recent-header">You Recently been in </h1>
      </li>
      {recentHotelsList?.length &&
        recentHotelsList?.map((hotel: Hotel) => {
          return <HotelCard hotel={hotel} key={hotel.hotelId}></HotelCard>;
        })}
    </ul>
  );
};

export default RecentHotels;
