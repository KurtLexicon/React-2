import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Welcome from "./pages/welcome";
// import "./index.css";
import { PersonList, loader as personListLoader } from "./pages/PersonList";
import { action as seedAction, Seed } from "./pages/SeedList";
import { action as removePersonAction } from "./actions/RemovePerson";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  PersonForm,
  loader as personFormLoader,
  action as personFormAction,
} from "./pages/PersonForm";
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
            path: "personList",
            element: <PersonList />,
            loader: personListLoader,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: `person/:id`,
            element: <PersonForm id={0} />,
            loader: personFormLoader,
            action: personFormAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "person/:id/remove",
            action: removePersonAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "auth",
            element: <Auth />,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "seedPersonList",
            element: <Seed />,
            action: seedAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "seedPersonList/doSeed",
            action: seedAction,
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
