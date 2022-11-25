/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { FormButtons } from "./FormButtons";
import { PopupErrmsg } from "./PopupErrmsg";

import Modal from "react-bootstrap/Modal";

export function EditPopup(props) {
  const {
    title,
    show,
    orgItem,
    validateItem,
    FormContent,
    onClose,
    onDelete,
    onChange,
  } = props;

  const [formItem, setFormItem] = useState(orgItem);
  const [errmsg, setErrmsg] = useState("");

  // Handle Button Clicks

  async function handleDelete() {
    onDelete(orgItem.id);
  }

  async function handleReset() {
    setFormItem({ ...orgItem });
  }

  async function handleSave() {
    onChange(formItem);
  }

  // Handle Change & Validate

  function formValueChanged(changes) {
    setFormItem({ ...formItem, ...changes });
  }

  function handleCancel() {
    onClose();
  }

  // Render Popup

  const errs = validateItem(formItem);
  const notValid = errs && Object.values(errs).some((x) => x);
  const saveDisabled = notValid ? true : false;
  const saveButtonVariant = notValid ? "secondary" : "success";

  function handleSubmit(e) {
    e.preventDefault && e.preventDefault();
    return false;
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="editPopup">
        <Modal.Title>{title || "Edit City"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PopupErrmsg text={errmsg} onClose={() => setErrmsg("")} />
        {orgItem && (
          <Form
            onSubmit={handleSubmit}
            method="post"
            id="edit-form"
            className="form-grid"
          >
            <input type="hidden" name="id" value={orgItem.id || ""} />
            <FormContent
              errs={errs}
              formItem={formItem}
              orgItem={orgItem}
              onChanged={formValueChanged}
            />
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <FormButtons
          isNew={!orgItem.id}
          saveDisabled={saveDisabled}
          saveButtonVariant={saveButtonVariant}
          onReset={handleReset}
          onDelete={handleDelete}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal.Footer>
    </Modal>
  );
}
