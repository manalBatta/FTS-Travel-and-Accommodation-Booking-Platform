import { useEffect, useState } from "react";
import { readFromReader, recentHotels } from "../../../APIs";
import { Auth, Hotel } from "../../../Types";
import HotelCard from "../../HotelCard/HotelCard";
import { getUser } from "../../../Helpers";
import "./RecentHotels.css";
const RecentHotels = () => {
  const [recentHotelsList, setRecentHotelsList] = useState<Hotel[]>([]);

  const getRecent = async (authentication: number) => {
    try {
      const response = await recentHotels(authentication);
      const result = await readFromReader(response);
      if (result) setRecentHotelsList(JSON.parse(result));
    } catch (error) {
      console.error("Failed to load recent hotels:", error);
    }
  };

  useEffect(() => {
    const user: Auth = getUser();
    getRecent(+user.user_id);
  }, []);

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
