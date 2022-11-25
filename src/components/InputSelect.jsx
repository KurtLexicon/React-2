/* eslint-disable react/prop-types */
import React from "react";
import "../styles/Input.css";

export function InputSelect(props) {
  const { label, err, orgValue, id, value, onChange, selectList } = props;
  function handleValueChanged(e) {
    onChange(e.target.value);
  }

  let inputClassName =
    value.toString() !== orgValue.toString() ? "inputChanged" : "";
  // selected={x.text === value ? "selected" : ""}
  return (
    <div className="inputGroup">
      <label>{label}</label>
      <div className="tooltipBase">
        {err && <div className="tooltipPopup">{err}</div>}
        <select
          className={inputClassName}
          id={id}
          name={id}
          type="text"
          value={value}
          size={1}
          onChange={handleValueChanged}
        >
          {selectList.map((x) => (
            <option
              key={x.text}
              value={x.text}
            >
              {x.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
