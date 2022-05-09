import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        { username, password }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.clear();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
