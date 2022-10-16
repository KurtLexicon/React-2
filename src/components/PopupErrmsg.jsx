import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function PopupErrmsg(props) {
  const { title, text, onClose } = props;
  return (
    <Modal show={!!text} onHide={onClose} >
      <Modal.Header closeButton className="errormessage">
        <Modal.Title>{title || 'Error'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={onClose}>
          OK
        </Button>{" "}
      </Modal.Footer>
    </Modal>
  );
}
