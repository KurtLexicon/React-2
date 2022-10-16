/* eslint-disable react/prop-types */
import React from "react";

import { InputText } from "./InputText";
import { InputSelect } from "./InputSelect";

export function CityFormContent(props) {
  const { errs, formItem, orgItem, onChanged } = props;
  const nameChanged = (name) => onChanged({ name });

  function countryChanged(newCountryId) {
    const country = formItem.selectListCountries.find(
      (x) => x.text === newCountryId
    );
    if (country) {
      const countryId = Number(newCountryId);
      const countryName = country.value;
      onChanged({ countryId, countryName });
    }
  }

  return (
    <div className="inputBox">
      <InputText
        id="name"
        label="Name"
        err={errs.errName}
        value={formItem.name || ""}
        orgValue={orgItem.name || ""}
        onChange={nameChanged}
      />
      <InputSelect
        id="countryId"
        label="Country"
        err={errs.errCountry}
        value={formItem.countryId || ""}
        orgValue={orgItem.countryId || ""}
        onChange={countryChanged}
        selectList={orgItem.selectListCountries}
      />
    </div>
  );
}
