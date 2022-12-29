import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function DeleteModel(props) {

    


    

    return (
        <div>
            
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the recipe?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={props.onDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

