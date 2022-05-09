import { createSlice } from '@reduxjs/toolkit';

const roleControlerSlice = createSlice({
  name: 'roleControler',
  initialState: {
    role: [],
    permissions: [],
  },
  reducers: {},
});

export const roleControlerActions = roleControlerSlice.actions;
export default roleControlerSlice;
