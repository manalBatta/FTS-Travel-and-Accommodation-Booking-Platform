import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import ErrorPage from "./error-page";
import LoginPage from "./components/LoginPage";

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
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
