import React from "react";
import { Form, redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { seed } from "../persons";

export async function action() {
  await seed();
  return redirect(`/personList`);
}

export function Seed() {
  return (
    <Container>
      <Form id="seedForm" method="post">
        <h1>Seed person list with sample data</h1>
        <p>
          If you Click the <strong>Continue</strong> button existing persons
          will be replaced.
        </p>
        <div className="buttonBox">
          <Button type="submit">Continue</Button>
        </div>
      </Form>
    </Container>
  );
}
