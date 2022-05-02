import React, { useEffect, useState } from 'react';
import axios from 'axios';
import postService from '../../services/post.service.js';

function PostDashboard() {
  const [post, setPost] = useState();
  const [user, setUser] = useState(null);
  //   console.log(post);

  const accessToken = JSON.parse(
    localStorage.getItem('accessToken')
  ).accessToken;

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    postService.getAllPosts();

    async function populateQuote() {
      const req = await fetch('http://localhost:5000/api/v1/post/all', {
        headers: {
          Authorization: accessToken,
        },
      });

      const data = await req.json();
      console.log(data);
    }

    populateQuote();
  }, []);
  return (
    <div>
      <h1>PostDashboard</h1>
    </div>
  );
}

export default PostDashboard;
