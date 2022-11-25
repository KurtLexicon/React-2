/* eslint-disable react/prop-types */
import React from "react";

import { InputText } from "../components/InputText";
import { InputSelect } from "../components/InputSelect";
import { InputMultiSelect } from "../components/InputMultiSelect";

export function PersonFormContent(props) {
  const { errs, formItem, orgItem, onChanged } = props;

  const nameChanged = (name) => onChanged({ name });
  const phoneChanged = (phone) => onChanged({ phone });
  function cityChanged(newCityId) {
    const city = formItem.selectListCities.find((x) => x.text === newCityId);
    if (city) {
      const cityId = Number(newCityId);
      const cityName = city.value;
      onChanged({ cityId, cityName });
    }
  }
  function languagesChanged(languageIds) {
    onChanged({ languageIds });
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
      <InputText
        id="phone"
        label="Phone Number"
        err={errs.errPhone}
        value={formItem.phone || ""}
        orgValue={orgItem.phone || ""}
        onChange={phoneChanged}
      />
      <InputSelect
        id="cityId"
        label="City"
        err={errs.errCity}
        value={formItem.cityId || ""}
        orgValue={orgItem.cityId || ""}
        onChange={cityChanged}
        selectList={orgItem.selectListCities}
      />
      <InputMultiSelect
        id="languageIds"
        label="Languages"
        value={formItem.languageIds || ""}
        orgValue={orgItem.languageIds || ""}
        onChange={languagesChanged}
        selectList={orgItem.selectListLanguages}
      />
    </div>
  );
}
