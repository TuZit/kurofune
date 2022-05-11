import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import roleService from '../services/role.service.js';
import PerItem from './PerItem.jsx';
import { logout } from '../store/authSlice.js';
import {
  useGetRoleQuery,
  useAddRoleMutation,
  useDeleteRoleByIDMutation,
} from '../services/roleApi.js';
import { useGetPerQuery } from '../services/perApi.js';
import { useGetPostQuery } from '../services/postApi.js';

function RoleControl() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRoleQuery = useGetRoleQuery({ refetchOnMountOrArgChange: true });
  const [addRole, addRoleMutation] = useAddRoleMutation();
  const [deleteRoleByID] = useDeleteRoleByIDMutation();
  // console.log(addRoleMutation);

  const getPerQuery = useGetPerQuery();
  // const getPostQuery = useGetPostQuery();

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

  // Check Authorization
  const [isAuthorization, setIsAuthorization] = useState(false);

  // Add New Role func
  const handleAddNewRole = async () => {
    const roleNameList = roleData.map((role) => role.name);

    if (newRole.trim() === '') {
      toast.warning('This filed id required!');
      return;
    }

    if (roleNameList.includes(newRole)) {
      toast.warning('Role Name Already Exists!');
      return;
    } else {
      // roleService.createRole(
      //   newRole,
      //   toast,
      //   setRoleData,
      //   setSelectedRole,
      //   getPerQuery.refetch
      // );

      // Using RTK Query
      await addRole(newRole);
      getRoleQuery.refetch();
      setSelectedRole(addRoleMutation.data);

      setShowAddRole(false);
    }
  };

  // Add new permission to current role
  const handleAddNewPer = () => {
    if (newPer.trim() === '') {
      toast.warning('This filed id required!');
      return;
    }
    roleService.createPer(newPer, toast, setPerDatas, setRoleID);
    setShowAddPer(false);
  };

  // Delete Role func
  const handleDeleteRole = async () => {
    // roleService.deleteRoler(roleID, toast, setRoleData);
    try {
      await deleteRoleByID(roleID);
      toast.success('Deleted Permission!');
      getRoleQuery.refetch();
      setDeleteRole(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete a Permission
  const handleDeletePermission = () => {
    roleService.deletePermission(perID, toast, setPerDatas);
    setShowDelete(false);
  };

  // Modify Permission Name
  const handleModifyPerName = () => {
    roleService.modifyPerName(perID, modidyPer, toast, setPerDatas);
    setShowUpdatePer(false);
  };

  // Checkbox checked
  const checkPermission = (perCheck) => {
    return selectedRole?.perIDList.find((item) => item === perCheck)
      ? true
      : false;
  };

  // Save Permission
  const handleSavePer = () => {
    roleService.savePerList(
      roleID,
      selectedRole?.perIDList,
      toast,
      setPerDatas,
      setRoleData
    );
  };

  // Config Header Authorization before doing request
  const interceptorJWT = axios.create();
  interceptorJWT.interceptors.request.use(
    (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(
        JSON.parse(localStorage.getItem('login')).accessToken
      );
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        dispatch(logout());
        localStorage.clear();
        navigate('/auth/login');
        toast.warning('Token is Expired. Please Login Again !');
        toast.clearWaitingQueue();
      }

      const accessToken = JSON.parse(localStorage.getItem('login')).accessToken;
      config.headers['Authorization'] = `Bearer ${accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Get all Post with Headers check Authorization
  const getAllPost = async () => {
    try {
      await interceptorJWT.get('http://localhost:5000/api/v1/post/all');
      setIsAuthorization(true);
    } catch (err) {
      setIsAuthorization(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // Get all roles, permissions datas when mount
  useEffect(() => {
    // sửa đc 1 chỗ với useEffect cuối
    // roleService.getRole(setRoleData);
    // roleService.getPers(setPerDatas);

    getPerQuery.refetch();
    getRoleQuery.refetch();
  }, [roleID]);

  useEffect(() => {
    if (getRoleQuery.isSuccess === true) {
      setRoleData(getRoleQuery.data);
    }
    if (getPerQuery.isSuccess === true) {
      setPerDatas(getPerQuery.data);
    }
    if (addRoleMutation.isSuccess === true) {
      setSelectedRole(addRoleMutation.data);
    }
  }, [
    getRoleQuery.isSuccess,
    getPerQuery.isSuccess,
    getRoleQuery.data,
    getPerQuery.data,
    addRoleMutation.isSuccess,
    addRoleMutation.data,
  ]);

  return (
    <div className='role-container'>
      <ToastContainer autoClose={1500} limit={1} theme='colored' />
      <Container fluid>
        <Navbar
          className='d-flex align-items-center justify-content-around '
          style={{ backgroundColor: '#62a19b' }}
        >
          {/* Role Body */}
          <Container fluid>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Brand href='#'>ROLE:</Navbar.Brand>
            <Navbar.Collapse id='navbarScroll'>
              <Nav className='me-auto my-2 '>
                <Form.Select
                  className='role-selecter'
                  value={selectedRole?.name || ''}
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
                  onClick={getAllPost}
                >
                  <option value='none' hidden>
                    Choose your Role
                  </option>
                  {isAuthorization === true &&
                    roleData?.map((role, i) => (
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
                <Button
                  variant='outline-success'
                  onClick={() => {
                    dispatch(logout());
                    navigate('/auth/login');
                  }}
                >
                  Log Out
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
          {perDatas && isAuthorization === true ? (
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
                  getPers={roleService.getPers}
                  setSelectedRole={setSelectedRole}
                />
              );
            })
          ) : (
            <>
              <h3>Data is Fetching..., Please Login again to get data</h3>
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
                <Form.Label>Permission Name</Form.Label>
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

export default memo(RoleControl);
