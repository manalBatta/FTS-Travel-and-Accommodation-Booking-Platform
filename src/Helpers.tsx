import { jwtDecode } from "jwt-decode";
import { Auth } from "./Types";

export const getUser = () => {
  const authLocalStorage = localStorage.getItem("auth");
  const result = authLocalStorage ? JSON.parse(authLocalStorage) : null;
  const token = result?.authentication;
  const decodedUser = jwtDecode<Auth>(token);
  //console.log(decodedUser);
  return decodedUser;
};
