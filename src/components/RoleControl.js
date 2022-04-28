import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';

import {
  Container,
  Navbar,
  Nav,
  Form,
  Button,
  ButtonGroup,
  Modal,
} from 'react-bootstrap';
import PerItem from './PerItem.jsx';

const ROLE_API = 'https://62642ce498095dcbf92c71ce.mockapi.io/api/';
let isDisabled = false;

function RoleControl() {
  const [showAddRole, setShowAddRole] = useState(false);
  const [showMofifyRole, setShowModifyRole] = useState(false);
  const [deleteRole, setDeleteRole] = useState(false);
  const [showAddPer, setShowAddPer] = useState(false);
  const [showUpdatePer, setShowUpdatePer] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Name of Role when select dropdown
  const [roleName, setRoleName] = useState('Choose your Role');
  // New Role's name when change the input in add new modal
  const [newRole, setNewRole] = useState('');
  // New permission wanna Add to Database
  const [newPer, setNewPer] = useState('');
  // All role datas from API
  const [roleData, setRoleData] = useState([]);
  // All Permission datas from API
  const [perDatas, setPerDatas] = useState([]);

  // Current Role ID
  const [roleID, setRoleID] = useState('');
  // ID of permission want to delete
  const [perID, setPerID] = useState('');
  // New Permission's Name is Modified
  const [modidyPer, setModifyPerName] = useState('');
  // Selected Role datas
  const [selectedRole, setSelectedRole] = useState();
  //New Permission List to save
  const [newPerList, setNewPerList] = useState([]);

  useEffect(() => {
    const perBody = document.querySelector('.permission-body');
    if (roleName === 'Choose your Role') {
      perBody.style.display = 'none';
    } else {
      perBody.style.display = 'block';
    }
  }, [roleName]);

  useEffect(() => {
    isDisabled = true;
  }, [roleID]);
  // Get all Role from API
  const getRole = async () => {
    try {
      const res = await axios.get(ROLE_API + 'roles');
      setRoleData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get all Permission from API
  const getPers = async () => {
    try {
      const res = await axios.get(ROLE_API + 'permission');
      setPerDatas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get all roles, permissions datas when mount
  useEffect(() => {
    getRole();
    getPers();
  }, []);

  // Add New Role func
  const createRole = (role) => {
    return axios
      .post(ROLE_API + 'roles', {
        name: role,
      })
      .then(() => {
        getRole();
        toast.success('Successfully Added Role!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed Add Role!');
      });
  };
  const handleAddNewRole = () => {
    createRole(newRole);
    setShowAddRole(false);
  };

  // Add new permission to current role
  const createPer = (name) => {
    return axios
      .post(ROLE_API + 'permission', {
        name: name,
      })
      .then((res) => {
        getPers();
        toast.success('Successfully Added Permission!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed Add Permission!');
      });
  };
  const handleAddNewPer = () => {
    createPer(newPer);
    setShowAddPer(false);
  };

  // Delete Role  func
  const deleteRoler = (id) => {
    axios
      .delete(`${ROLE_API}roles/${id}`)
      .then(() => {
        getRole();
        toast.success('Deleted Role!');
      })
      .catch((err) => {
        toast.error('Failed to Delete!');
        console.log(err);
      });
  };
  const handleDeleteRole = () => {
    deleteRoler(roleID);
    setDeleteRole(false);
  };

  // Delete a Permission
  const deletePermission = (id) => {
    axios
      .delete(`${ROLE_API}permission/${id}`)
      .then(() => {
        getPers();
        toast.success('Deleted Permission!');
      })
      .catch((err) => {
        toast.error('Failed to Permission!');
        console.log(err);
      });
  };
  const handleDeletePermission = () => {
    deletePermission(perID);
    setShowDelete(false);
  };

  // Modify Permission Name
  const modifyPerName = async (id, name) => {
    try {
      await axios.put(`${ROLE_API}permission/${id}`, {
        name: name,
      });
      getPers();
      toast.success('Modified Permission');
    } catch (err) {
      console.log(err);
      toast.err('Modify Permission Failed');
    }
  };
  const handleModifyPerName = () => {
    modifyPerName(perID, modidyPer);
    setShowUpdatePer(false);
  };

  // Checkbox checked
  const checkPermission = (perCheck) => {
    // return selectedRole?.perList.includes(perCheck);
    return selectedRole?.perIDList.find((item) => item === perCheck)
      ? true
      : false;
  };

  // Save Permission
  const savePerList = async (id, newPerList) => {
    try {
      axios.put(`${ROLE_API}roles/${id}`, {
        perIDList: newPerList,
      });
      getPers();
      getRole();
      toast.success('Successfully Save Permission!');
    } catch (err) {
      toast.error('Failed to save!');
      console.log(err);
    }
  };
  const handleSavePer = () => {
    savePerList(roleID, selectedRole?.perIDList);
  };

  console.log(roleData);

  // console.log(selectedRole);
  // console.log(newPerList);
  return (
    <div className='role-container'>
      <ToastContainer autoClose={3000} limit={1} theme='colored' />
      <Container fluid>
        <Navbar
          bg='primary'
          className='d-flex align-items-center justify-content-around bg-opacity-50'
        >
          {/* Role Body */}
          <Container fluid>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Brand href='#'>ROLE:</Navbar.Brand>
            <Navbar.Collapse id='navbarScroll'>
              <Nav className='me-auto my-2 '>
                <Form.Select
                  className='role-selecter'
                  onChange={(e) => {
                    setRoleName(e.target.value);
                    setRoleID(
                      roleData.find((role) => role.name === e.target.value).id
                    );

                    if (roleData) {
                      setSelectedRole(
                        roleData.find((role) => role.name === e.target.value)
                      );
                    }
                  }}
                >
                  <option value='none' disabled={isDisabled}>
                    Choose your Role
                  </option>
                  {roleData &&
                    roleData.map((role, i) => (
                      <option key={i} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                </Form.Select>
              </Nav>

              <ButtonGroup>
                <Button
                  variant='outline-success'
                  onClick={() => setShowAddRole(true)}
                >
                  Add
                </Button>
                <Button
                  variant='outline-success'
                  onClick={() => setDeleteRole(true)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      {/* Permission Boy */}
      <Container className='my-4 permission-body' disabled={true}>
        <Button
          disabled={roleName === 'Choose your Role'}
          onClick={() => setShowAddPer(true)}
        >
          Add Permission
        </Button>

        <p className='mt-3'>PERMISSION LISTS:</p>
        <Form className='my-3'>
          {perDatas ? (
            perDatas.map((per, i) => {
              return (
                <PerItem
                  key={i}
                  per={per}
                  setShowDelete={setShowDelete}
                  setShowUpdatePer={setShowUpdatePer}
                  setPerID={setPerID}
                  selectedRole={selectedRole}
                  checkPermission={checkPermission}
                  roleID={roleID}
                  getPers={getPers}
                  setNewPerList={setNewPerList}
                  setSelectedRole={setSelectedRole}
                />
              );
            })
          ) : (
            <>
              <h2>Data is Fetching...</h2>
              <ReactLoading type='spin' color='#000' />
            </>
          )}

          <Button className='mt-3' onClick={handleSavePer}>
            SAVE
          </Button>
        </Form>
      </Container>

      {/* Modal */}
      <Container>
        {/* Modify Role's name modal */}
        <Modal show={showMofifyRole} onHide={() => setShowModifyRole(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Your New Role name</Form.Label>
                <Form.Control type='text' defaultValue='Create' autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          {/* <Modal.Title>Noitice: Apply Update on all other Roles?</Modal.Title> */}
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => setShowModifyRole(false)}
            >
              Close
            </Button>
            <Button variant='primary' onClick={() => setShowModifyRole(false)}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add New Role Modal */}
        <Modal
          show={showAddRole}
          onHide={() => setShowAddRole(false)}
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
                <Form.Control
                  type='text'
                  autoFocus
                  onChange={(e) => {
                    // if (e.target.value.trim() === '') {
                    //   toast.warning('This field is required');
                    // }
                    setNewRole(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowAddRole(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAddNewRole}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Role Modal */}
        <Modal
          show={deleteRole}
          onHide={() => setDeleteRole(false)}
          className='delete-modal'
        >
          <Modal.Header closeButton>
            <Modal.Title>Khoan dừng khoảng chừng là 2s !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure to delete your Role?</p>
            <p>Your data will delete permanently.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => setDeleteRole(false)}>
              Cancle
            </Button>
            <Button variant='primary' onClick={handleDeleteRole}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add New Permission */}
        <Modal
          show={showAddPer}
          onHide={() => setShowAddPer(false)}
          animation
          centered
          enforceFocus
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Permission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Permission Name</Form.Label>
                <Form.Control
                  type='text'
                  autoFocus
                  onChange={(e) => {
                    // if (e.target.value.trim() === '') {
                    //   toast.warning('This field is required');
                    // }
                    setNewPer(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowAddPer(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleAddNewPer}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modify Permission name */}
        <Modal show={showUpdatePer} onHide={() => setShowUpdatePer(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modify Permission Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>New Permission Name</Form.Label>
                <Form.Control
                  type='text'
                  defaultValue=''
                  autoFocus
                  onChange={(e) => {
                    // if (e.target.value.trim() === '') {
                    //   toast.warning('This field is required');
                    // }
                    setModifyPerName(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowUpdatePer(false)}>
              Close
            </Button>
            <Button variant='primary' onClick={handleModifyPerName}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Permission Modal */}
        <Modal
          show={showDelete}
          onHide={() => setShowDelete(false)}
          className='delete-modal'
        >
          <Modal.Header closeButton>
            <Modal.Title>Khoan dừng khoảng chừng là 2s !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this permission?
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowDelete(false)}>
              Cancle
            </Button>
            <Button variant='primary' onClick={handleDeletePermission}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default RoleControl;
