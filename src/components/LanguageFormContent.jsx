/* eslint-disable react/prop-types */
import React from "react";

import { InputText } from "../components/InputText";

  export function LanguageFormContent (props)  {
    const { errs, formItem, orgItem, onChanged } = props;
    const nameChanged = (name) => onChanged({ name });

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
      </div>
    );
  }