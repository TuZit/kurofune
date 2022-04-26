import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

function PerItem({ setShowUpdatePer, setShowDelete, per, setPerID }) {
  return (
    <>
      <Form.Group
        id={per.id}
        className='d-flex align-items-center justify-content-between p-2 border mb-1'
      >
        <Form.Check
          type='checkbox'
          //   checked={per.name === 'create'}
          label={per.name}
        />
        <ButtonGroup>
          <Button
            className='me-2'
            onClick={() => {
              setShowDelete(true);
              setPerID(per.id);
            }}
          >
            <i className='fa-solid fa-trash'></i>
          </Button>
          <Button
            onClick={() => {
              setShowUpdatePer(true);
              setPerID(per.id);
            }}
          >
            <i className='fa-solid fa-up-right-from-square'></i>
          </Button>
        </ButtonGroup>
      </Form.Group>
    </>
  );
}

export default PerItem;
