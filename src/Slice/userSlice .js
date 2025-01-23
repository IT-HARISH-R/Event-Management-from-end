// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null, // Store the token here
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // Save token after login
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // Clear token on logout
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;