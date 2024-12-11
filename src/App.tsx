import "./App.css";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import ErrorPage from "./error-page";
import LoginPage from "./components/LoginPage";
import SearchResultsPage from "./components/SearchResultsPage";
//import { AuthContext, AuthTokens } from "./components/context/auth";
import HotelPage from "./components/HotelPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import ConfirmationPage from "./components/CheckoutPage/ConfirmationPage/ConfirmationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/auth/login",
    element: <LoginPage></LoginPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/search-results/amenities",
    element: <SearchResultsPage></SearchResultsPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/hotels/:id",
    element: <HotelPage></HotelPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/checkoutPage",
    element: <CheckoutPage></CheckoutPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/confirmation",
    element: <ConfirmationPage></ConfirmationPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
]);
function App() {
  // const [authTokens, setAuthTokens] = useState<AuthTokens>({
  //   authentication: "none",
  //   userType: "user",
  // });

  // const setTokens = (data: AuthTokens) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // };

  return (
    //   <AuthContext.Provider
    // value={{ authTokens, setAuthTokens: setTokens }}
    //  >
    <RouterProvider router={router} />
    //    </AuthContext.Provider>
  );
}

export default App;
