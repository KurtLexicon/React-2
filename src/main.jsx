import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import Welcome from "./pages/welcome";
import { Cities } from "./pages/Cities";
import { Persons} from "./pages/Persons";
import { Countries} from "./pages/Countries";
import { Languages} from "./pages/Languages";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

import { Auth } from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "welcome",
            element: <Welcome />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "persons",
            element: <Persons />,
            errorElement: <div>Oops! There was an error.</div>,
          },       
          {
            path: "cities",
            element: <Cities />,
            errorElement: <div>Oops! There was an error.</div>,
          },       
          {
            path: "countries",
            element: <Countries />,
            errorElement: <div>Oops! There was an error.</div>,
          },       
          {
            path: "languages",
            element: <Languages />,
            errorElement: <div>Oops! There was an error.</div>,
          },       
          {
            path: "auth",
            element: <Auth />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            index: true,
            element: <Welcome />,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
