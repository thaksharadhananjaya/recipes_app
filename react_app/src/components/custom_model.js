import React from 'react'
import { Modal, Button } from 'react-bootstrap'


export default function CustomModel( props ) {
  return (
    <Modal size="lg" show={props.showAddModel} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.add}>
          {props.title==='Edit Recipe'? 'Save' : props.title}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
