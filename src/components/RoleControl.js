import React, { useEffect, useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  ButtonGroup,
  Modal,
  ModalTitle,
} from 'react-bootstrap';
import RoleItem from './RoleItem.jsx';
import userService from '../services/user.service.js';

function RoleControl() {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  useEffect(() => {
    // userService.createUser();
  }, []);

  return (
    <div className='role-container' style={{ height: '1000px' }}>
      <Container fluid>
        <Navbar
          bg='light'
          className='d-flex align-items-center justify-content-around '
        >
          <Container fluid>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Brand href='#'>ROLE:</Navbar.Brand>
            <Navbar.Collapse id='navbarScroll'>
              <Nav className='me-auto my-2 ' navbarScroll>
                <Form.Select aria-label='Default select example'>
                  <option>Admin Role</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Select>
              </Nav>

              <ButtonGroup>
                <Button variant='outline-success' onClick={handleShowAdd}>
                  Add
                </Button>
                <Button variant='outline-success' onClick={handleShowUpdate}>
                  Modify
                </Button>
              </ButtonGroup>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <Container>
        <p>PERMISSION</p>
        <Button onClick={handleShowAdd}>Add Permission</Button>

        <Form className='mb-3'>
          <RoleItem handleShow={handleShow} />

          <Form.Group className='d-flex align-items-center justify-content-between py-2'>
            <Form.Check type='checkbox' label='Update' />
            <ButtonGroup>
              <Button className='me-2' onClick={handleShow}>
                <i className='fa-solid fa-trash'></i>
              </Button>
              <Button>
                <i className='fa-solid fa-up-right-from-square'></i>
              </Button>
            </ButtonGroup>
          </Form.Group>

          <Form.Group className='d-flex align-items-center justify-content-between py-2'>
            <Form.Check type='checkbox' label='Delete' />
            <ButtonGroup>
              <Button className='me-2' onClick={handleShow}>
                <i className='fa-solid fa-trash'></i>
              </Button>
              <Button>
                <i className='fa-solid fa-up-right-from-square'></i>
              </Button>
            </ButtonGroup>
          </Form.Group>

          <Form.Group className='d-flex align-items-center justify-content-between py-2'>
            <Form.Check type='checkbox' label='Fetch' />
            <ButtonGroup>
              <Button className='me-2' onClick={handleShow}>
                <i className='fa-solid fa-trash'></i>
              </Button>
              <Button>
                <i className='fa-solid fa-up-right-from-square'></i>
              </Button>
            </ButtonGroup>
          </Form.Group>

          <Button>SAVE</Button>
        </Form>
      </Container>

      {/* Modal */}
      <Container>
        {/* Delete modal */}
        <Modal show={show} onHide={handleClose} className='delete-modal'>
          <Modal.Header closeButton>
            <Modal.Title>Khoan dừng khoảng chừng là 2s !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this permission?
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancle
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Update modal */}
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Permission</Form.Label>
                <Form.Control type='text' defaultValue='Create' autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Title>Noitice: Apply Update on all other Roles?</Modal.Title>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant='primary' onClick={handleCloseUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Role Modal */}
        <Modal
          show={showAdd}
          onHide={handleCloseAdd}
          animation
          centered
          enforceFocus
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Your Role</Form.Label>
                <Form.Control type='text' autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant='primary' onClick={handleCloseAdd}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default RoleControl;
