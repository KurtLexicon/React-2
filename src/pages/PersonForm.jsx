/* eslint-disable react/prop-types */
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getPerson, updatePerson, addPerson, deletePerson } from "../persons";
import { InputText } from "../components/InputText";

export async function loader({ params }) {
  console.log("loader");
  console.log(params.id);
  let person = await getPerson(params.id);
  console.log("called getPerson");
  if (!person) {
    throw new Response("Person does not exist", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return person;
}

export async function action({ request }) {
  const formData = await request.formData();
  const person = Object.fromEntries(formData);
  if (person.id == 0) {
    await addPerson(person);
  } else {
    await updatePerson(person);
  }
  return redirect(`/personList`);
}

export function PersonForm() {
  const orgPerson = useLoaderData();
  const [formPerson, setFormPerson] = useState(orgPerson);

  const navigate = useNavigate();
  async function handleDelete() {
    await deletePerson(orgPerson.id);
    navigate("/personList");
  }

  async function handleReset() {
    setFormPerson({ ...orgPerson });
  }
  function formValueChanged(changes) {
    setFormPerson({ ...formPerson, ...changes });
  }

  const firstNameChanged = (first_name) => formValueChanged({ first_name });
  const lastNameChanged = (last_name) => formValueChanged({ last_name });
  const emailChanged = (email) => formValueChanged({ email });
  const nationalityChanged = (nationality) => formValueChanged({ nationality });
  const ageChanged = (age) => formValueChanged({ age: age.replace(/\D/g, "") });

  const validateEmail = (text) => {
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return regexEmail.test(text);
  };

  function isNullOrEmpty(str) {
    return str === null || str === undefined || str === "";
  }

  function validatePerson(person) {
    return person
      ? {
          errEmail: validateEmail(person.email) ? "" : "Invalid e-mail format",
          errFirstName: isNullOrEmpty(person.first_name)
            ? "First Name can not be empty"
            : "",
          errLastName: isNullOrEmpty(person.last_name)
            ? "Last Name can not be empty"
            : "",
          errNationality: isNullOrEmpty(person.nationality)
            ? "Nationality can not be empty"
            : "",
          errAge: isNullOrEmpty(person.age)
            ? "Age can not be empty"
            : person.age < 0 || person.age > 199
            ? "Age must be from 0 to 199"
            : "",
        }
      : {};
  }

  const errs = validatePerson(formPerson);
  const notValid = errs && Object.values(errs).some((x) => x);
  const disabledValue = notValid ? "true" : "";
  const saveButtonVariant = notValid ? "secondary" : "success";
  return (
    <Container>
      {orgPerson && (
        <div>
          <Form method="post" id="person-form">
            <input type="hidden" name="id" value={orgPerson.id || ""} />
            <div className="inputBox">
              <InputText
                id="first_name"
                label="First Name"
                err={errs.errFirstName}
                value={formPerson.first_name || ""}
                orgValue={orgPerson.first_name || ""}
                onChange={firstNameChanged}
              />
              <InputText
                id="last_name"
                label="Last Name"
                err={errs.errLastName}
                value={formPerson.last_name || ""}
                orgValue={orgPerson.last_name || ""}
                onChange={lastNameChanged}
              />
              <InputText
                id="email"
                label="E-mail"
                err={errs.errEmail}
                value={formPerson.email || ""}
                orgValue={orgPerson.email || ""}
                onChange={emailChanged}
              />
              <InputText
                id="nationality"
                label="Nationality"
                err={errs.errNationality || ""}
                value={formPerson.nationality || ""}
                autoComplete="on"
                orgValue={orgPerson.nationality}
                onChange={nationalityChanged}
              />
              <InputText
                id="age"
                label="Age"
                err={errs.errAge}
                value={formPerson.age || ""}
                orgValue={orgPerson.age || ""}
                onChange={ageChanged}
              />{" "}
            </div>
            <div className="buttonBox">
            <Button
                className="formButton"
                variant="primary"
                type="button"
                onClick={handleReset}
              >
                Reset
              </Button>
              {!!orgPerson.id && (
                <Button
                className="formButton"
                variant="danger"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
                <Button
                className="formButton"
                variant="primary"
                value="Cancel"
                onClick={() => navigate(`/personList`)}
              >
                Cancel
              </Button>
              <Button
                disabled={disabledValue}
                className="formButton"
                variant={saveButtonVariant}
                type="submit"
                value="Save"
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Container>
  );
}
