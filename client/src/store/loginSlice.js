import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogged: false,
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
    },
    logout(state, action) {
      state.isLogged = false;
      localStorage.clear();
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
