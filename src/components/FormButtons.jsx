import React from "react";
import Button from "react-bootstrap/Button";




export function FormButtons(props) {
    const {
        isNew,
        saveDisabled,
        saveButtonVariant,
        onCancel,
        onReset,
        onDelete,
        onSave } = props
    return (
        <div className="buttonBox">
        <Button
          className="formButton"
          variant="primary"
          type="button"
          onClick={onReset}
        >
          Reset
        </Button>
        {!isNew && (
          <Button
            className="formButton"
            variant="danger"
            type="button"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
        <Button
          className="formButton"
          variant="primary"
          value="Cancel"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={saveDisabled}
          className="formButton"
          variant={saveButtonVariant}
          value="Save"
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    )
}
