import { useEffect, useState } from "react";
//import { useAuth } from "../../context/auth";
import { readFromReader, recentHotels } from "../../../APIs";
import { Auth, Hotel } from "../../../Types";
import HotelCard from "../../HotelCard/HotelCard";
import { getUser } from "../../../Helpers";
import { number } from "yup";

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
  return (
    <>
      {recentHotelsList?.length &&
        recentHotelsList?.map((hotel: Hotel) => {
          return <HotelCard hotel={hotel}></HotelCard>;
        })}
    </>
  );
};

export default RecentHotels;
