import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
  },
  reducers: {
    save: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});
export const { save, logout } = userSlice.actions;
export default userSlice.reducer;
