// import { createContext, useContext } from "react";
// import { number } from "yup";

// export type AuthTokens = {
//   authentication: string;
//   userType: string;
// };
// export type Auth = {
//   authTokens: AuthTokens;
//   setAuthTokens: (data: { authentication: string; userType: string }) => void;
// };

// export const AuthContext = createContext<Auth>({
//   authTokens: {
//     authentication: "not autherized",
//     userType: "user",
//   },
//   setAuthTokens: (data: AuthTokens) => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }
