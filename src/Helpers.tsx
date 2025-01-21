import { jwtDecode } from "jwt-decode";
import { Auth } from "./Types";

export const getUser = () => {
  const authLocalStorage = localStorage.getItem("auth");
  if (!authLocalStorage) {
    console.warn("No auth data found in localStorage");
    return null;
  }

  let result;
  try {
    result = JSON.parse(authLocalStorage);
  } catch (error) {
    console.error("Failed to parse auth data from localStorage:", error);
    return null;
  }

  const token = result?.authentication;
  if (!token || typeof token !== "string") {
    console.warn("Token is missing or invalid");
    return null;
  }

  try {
    const decodedUser = jwtDecode<Auth>(token);
    console.log("Decoded user:", decodedUser);
    return decodedUser;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
