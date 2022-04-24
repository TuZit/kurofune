import axios from 'axios';
const API = 'https://62642ce498095dcbf92c71ce.mockapi.io/api/';

const createUser = (permission) => {
  return axios
    .post(API + 'users', {
      per: permission,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const userService = {
  createUser,
};

export default userService;
