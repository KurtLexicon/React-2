/* eslint-disable react/prop-types */
import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ListRows.css";

export function GenericListRows(props) {
  const { items, onRowClick, onHeaderClick, cols } = props;
  
  return (
    <>
      <Container fluid className="listRow">
        <ListHeader onClick={onHeaderClick} cols={cols} />
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item className="clickableRow" key={item.id}>
              <Row onClick={() => onRowClick(item.id)}>
                {cols.map((col) => (
                  <Col sm={col.width} key={col.name}>{item[col.name]}</Col>
                ))}
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}

function ListHeader(props) {
  const { onClick, cols } = props;
  return (
    <ListGroup>
      <ListGroup.Item className="headerRow">
        <Row>
          {cols.map((col) => (
            <Col
              key={col.name}
              className="sortableHeader"
              sm={col.width}
              onClick={() => onClick(col.name)}
            >
              {col.header}
            </Col>
          ))}
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

