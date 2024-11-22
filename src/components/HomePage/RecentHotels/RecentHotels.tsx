import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { readFromReader, recentHotels } from "../../../APIs";
import { Hotel } from "../../../Types";
import HotelCard from "../../HotelCard/HotelCard";

const RecentHotels = () => {
  const [recentHotelsList, setRecentHotelsList] = useState<Hotel[]>([]);
  const loggedUser = useAuth();
  console.log("from Recent Hotels in Home page  the user Id=", loggedUser);

  const getRecent = async (authentication: string) => {
    const response = await recentHotels(authentication);
    const result = await readFromReader(response);
    if (result) setRecentHotelsList(JSON.parse(result));
  };
  useEffect(() => {
    getRecent(loggedUser.authTokens.authentication);
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
