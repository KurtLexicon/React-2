/* eslint-disable react/prop-types */
import { React } from "react";

import { useNavigate, useLoaderData, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { PersonListRows } from "../components/PersonListRows";
import { getList } from "../persons";
import "./PersonList.css";

export async function loader() {
  let personList = await getList();
  return { personList };
}

export function PersonList() {
  const { personList } = useLoaderData();
  const navigate = useNavigate();

  function handleRowClick(personId) {
    navigate(`/person/${personId}`);
  }

  function handleRowDelete(personId) {
    navigate(`/person/${personId}`);
  }

  const arePersons = !!personList && personList.length > 0;
  return (
    <div className="personList">
      {arePersons && (
        <Container className="scrollarea">
          <PersonListRows
            persons={personList}
            rowClick={handleRowClick}
            rowDelete={handleRowDelete}
          />
        </Container>
      )}

      {!arePersons && (
        <Container>
        <h4>
          There are currently no added persons. You can either{" "}
          <strong>
            <NavLink to="/person/0">Add a new person</NavLink>
          </strong>{" "}
          , or{" "}
          <strong>
            <NavLink to="/seedPersonList">
              Seed the list with sample data
            </NavLink>
          </strong>{" "}
          .
        </h4>

        </Container>
      )}
    </div>
  );
}
