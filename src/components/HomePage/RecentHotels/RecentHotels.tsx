import { useContext } from "react";
import { useAuth } from "../../context/auth";
import { readFromReader, recentHotels } from "../../../APIs";

const RecentHotels = () => {
  const getRecent = async (authentication: string) => {
    const response = await recentHotels(authentication);
    const result = await readFromReader(response);
    if (result)
      console.log("Recent hotels request result=", JSON.stringify(result));
  };
  const loggedUser = useAuth();
  console.log("from Recent Hotels in Home page  the user Id=", loggedUser);
  getRecent(loggedUser.authTokens.authentication);
  return <></>;
};

export default RecentHotels;
