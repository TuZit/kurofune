import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

function PerItem({
  setShowUpdatePer,
  setShowDelete,
  per,
  setPerID,
  checkPermission,
  selectedRole,
  setNewPerList,
}) {
  let perIDList = selectedRole?.perIDList;

  const handleCheckBox = (e) => {
    if (e.target.checked === true) {
      perIDList.push(per.id);
      perIDList = Array.from(new Set(perIDList));
      setNewPerList(perIDList);
    } else {
      perIDList = perIDList.filter((item) => item !== per.id);
      perIDList = Array.from(new Set(perIDList));
      setNewPerList(perIDList);
    }
  };
  // let arr = ['a', 'b'];
  // const handleCheckBox = (e) => {
  //   let { value, checked } = e.target;
  //   if (checked === true) {
  //     arr.push(value);
  //     console.log('checked:', arr);
  //   }
  // };

  const [id, setId] = useState();

  return (
    <>
      {true && (
        <Form.Group
          disabled
          className='d-flex align-items-center justify-content-between p-2 border mb-1'
        >
          <Form.Check
            type='checkbox'
            defaultChecked={checkPermission(per.id)}
            label={per.name}
            value={per.id}
            // onChange={(e) => {
            //   handleCheckBox(e);
            // }}
            // onClick={(e) => {
            //   if (e.target.checked === false) {
            //     arr = arr.filter((x) => x !== per.id);
            //     console.log('ko check:', arr);
            //   }
            // }}
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
      )}
    </>
  );
}

export default PerItem;
