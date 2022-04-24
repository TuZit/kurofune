import axios from 'axios';
const ROLE_API = 'https://62642ce498095dcbf92c71ce.mockapi.io/api/';

const getRole = async () => {
  try {
    const res = await axios.get(ROLE_API);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createRole = (permission) => {
  return axios
    .post(ROLE_API, {
      per: permission,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const deleteRole = (id) => {
  axios.delete(`${ROLE_API}/${id}`);
};

const updateRole = (role, id) => {
  axios.put(`${ROLE_API}/${id}`, {
    ...role,
  });
};

const roleService = {
  getRole,
  createRole,
  deleteRole,
};

export default roleService;
