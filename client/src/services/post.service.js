import axios from 'axios';
const POST_API = 'http://localhost:5000/api/v1/post';

const getAllPosts = async (setPost) => {
  try {
    const res = await axios.get(POST_API + '/all');
    // setPost(res.data);
    console.log(res.data);
  } catch (err) {
    console.log(err.response);
  }
};

const createPost = async (post) => {
  try {
    const res = await axios.post(POST_API + '/create', post);
    return res.data;
  } catch (err) {
    console.log(err.response);
  }
};

const updatePost = async (id, post) => {
  try {
    const res = await axios.put(POST_API + `/update/:${id}`, post);
    return res.data;
  } catch (err) {
    console.log(err.response);
  }
};

const deletePost = async (id) => {
  try {
    const res = await axios.delete(POST_API + `/delete/:${id}`);
    return res.data;
  } catch (err) {
    console.log(err.response);
  }
};

const postService = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};

export default postService;
