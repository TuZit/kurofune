import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogged: false,
    loginRedirect: false,
    registerRedirect: false,
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
    },
    logout(state, action) {
      state.isLogged = false;
      localStorage.clear();
    },
    loginRedirect(state) {},
    registerRedirect(state) {},
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
