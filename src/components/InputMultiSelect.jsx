//import React, { useState } from "react";
import React from "react";
import { Col, Form } from "react-bootstrap";

export function InputMultiSelect(props) {
  const { label, id, value, onChange, selectList } = props;

  // const [field, setField] = useState(value);

  function handleValueChanged(e) {
    const newOptions = [].slice.call(e.target.selectedOptions).map((item) => item.value)
    // setField(newOptions);
    
    // const selectedItems = [].slice.call(e.target.selectedOptions)
    // e.target.selectedOptions

    onChange(newOptions);
  }

  return (
    <Form.Group as={Col}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id={id}
        name={id}
        as="select"
        multiple
        value={value}
        onChange={handleValueChanged}
      >
        {selectList.map(x => (
          <option key={x.text} value={x.text}>{x.value}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
