import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AppContext } from "../contexts/Contexts";
import "./Auth.css";

export function Auth() {
  const [newName, setNewName] = useState("");

  function handleNameChanged(value) {
    setNewName(value);
  }

  function loginHandler(appContext) {
    if (isNewNameValid) {
      appContext.setAppContext({
        ...appContext,
        userName: trimName(newName),
        isLoggedIn: true,
      });
    }
    setNewName(trimName(newName));
  }

  function logoutHandler(appContext) {
    appContext.setAppContext({
      ...appContext,
      userName: "",
      isLoggedIn: false,
    });
  }

  function trimName(name) {
    return name ? name.replace(/\s+/g, " ").trim() : "";
  }

  const isNewNameValid =
    trimName(newName).length >= 3 && trimName(newName).length <= 15;
  const buttonVariant = isNewNameValid ? "primary" : "secondary";
  const buttonDisabled = isNewNameValid ? false : true;

  return (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          {!appContext.isLoggedIn && (
            <Container>
              <Form onSubmit={() => loginHandler(appContext)}>
              <h1>Log in to the app</h1>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Enter your name:</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    value={newName}
                    onChange={(e) => handleNameChanged(e.target.value)}
                  />
                  <Form.Text>Your name must be 3-15 characters long</Form.Text>
                </Form.Group>
                <div className="buttonBox">
                  <Button
                    type="submit"
                    disabled={buttonDisabled}
                    variant={buttonVariant}
                  >
                    Log In
                  </Button>
                </div>
              </Form>
            </Container>
          )}
          {appContext.isLoggedIn && (
            <Container>
            <Form onSubmit={() => logoutHandler(appContext)}>
            <h1>Log out from the app</h1>
              <Form.Text>
                You are currently logged in as {appContext.userName}
              </Form.Text>
              <div className="buttonBox">
                <Button variant="primary" type="submit">
                  Log Out
                </Button>
              </div>
            </Form>
            </Container>
          )}
        </>
      )}
    </AppContext.Consumer>
  );
}
