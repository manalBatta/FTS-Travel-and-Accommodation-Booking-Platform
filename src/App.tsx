import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import ErrorPage from "./error-page"; // No need to lazy load error page, as it's small and frequently used.
import Loader from "./Loader";

const HomePage = lazy(() => import("./components/HomePage"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const SearchResultsPage = lazy(() => import("./components/SearchResultsPage"));
const HotelPage = lazy(() => import("./components/HotelPage"));
const CheckoutPage = lazy(
  () => import("./components/CheckoutPage/CheckoutPage")
);
const ConfirmationPage = lazy(
  () => import("./components/CheckoutPage/ConfirmationPage/ConfirmationPage")
);
const AdminPageForEasyManagement = lazy(
  () => import("./components/AdminPageForEasyManagement")
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(HomePage),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/login",
    element: withSuspense(LoginPage),
    errorElement: <ErrorPage />,
  },
  {
    path: "/search-results/amenities",
    element: withSuspense(SearchResultsPage),
    errorElement: <ErrorPage />,
  },
  {
    path: "/hotels/:id",
    element: withSuspense(HotelPage),
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkoutPage",
    element: withSuspense(CheckoutPage),
    errorElement: <ErrorPage />,
  },
  {
    path: "/confirmation",
    element: withSuspense(ConfirmationPage),
    errorElement: <ErrorPage />,
  },
  {
    path: "/adminManagement",
    element: withSuspense(AdminPageForEasyManagement),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
