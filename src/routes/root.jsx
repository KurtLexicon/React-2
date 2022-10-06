import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/Contexts";
import { Button, Nav, Navbar, NavLink as NV, NavItem } from "react-bootstrap";
import { Outlet, NavLink, useNavigation } from "react-router-dom";
import "./root.css";

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
        <div className="maxwidthcontent">
          <Button variant="link">
            <NavLink to="welcome">Welcome</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="personList">Person List</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="person/0">Add Person</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to="seedPersonList">Seed List</NavLink>
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
