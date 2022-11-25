import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/Contexts";
import { Button, Navbar } from "react-bootstrap";
import { Outlet, NavLink, useNavigation } from "react-router-dom";
import "../styles/root.css";

export async function action() {}

export async function loader() {
  return {};
}

export default function Root() {
  const [appContext, setAppContext] = useState(useContext(AppContext));

  const navigation = useNavigation();
  const authText = appContext.isLoggedIn ? "Log out" : "Log in";
  return (
    <AppContext.Provider value={{ ...appContext, setAppContext }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="light">
        <div>
          <Button variant="link">
            <NavLink to="welcome">Welcome</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="persons">Persons</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="cities">Cities</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="countries">Countries</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="languages">Languages</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="auth">{authText}</NavLink>
          </Button>
        </div>
      </Navbar>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </AppContext.Provider>
  );
}
