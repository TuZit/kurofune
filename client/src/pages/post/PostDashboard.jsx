import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import postService from '../../services/post.service.js';

function PostDashboard() {
  const [post, setPost] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  if (post) {
    console.log(post);
  }

  // Get access Token from LocalStorage
  const accessToken = JSON.parse(
    localStorage.getItem('accessToken')
  ).accessToken;

  // Config Header Authorization before doing request
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Get all Posts from API
  const getAllPosts = async () => {
    const data = await postService.getAllPosts();
    setPost(data);
  };

  // Create new Post to save to API
  const createPost = async () => {
    const inputPost = {
      title,
      description,
      url,
      status,
    };
    const res = await postService.createPost(inputPost);
    toast.success(res.message);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <h1>PostDashboard</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <div>
          <label>Title</label>
          <input type='text' onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Description</label>
          <input type='text' onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>Url</label>
          <input type='text' onChange={(e) => setUrl(e.target.value)} />
        </div>

        <div>
          <label>Status</label>
          <input type='text' onChange={(e) => setStatus(e.target.value)} />
        </div>

        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default PostDashboard;
