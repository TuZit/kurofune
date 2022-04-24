import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

function RoleItem({ handleShow }) {
  return (
    <>
      <Form.Group className='d-flex align-items-center justify-content-between py-2'>
        <Form.Check type='checkbox' label='Create' />
        <ButtonGroup>
          <Button className='me-2' onClick={handleShow}>
            <i className='fa-solid fa-trash'></i>
          </Button>
          <Button>
            <i className='fa-solid fa-up-right-from-square'></i>
          </Button>
        </ButtonGroup>
      </Form.Group>
    </>
  );
}

export default RoleItem;
