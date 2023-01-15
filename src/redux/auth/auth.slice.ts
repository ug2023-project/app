import { createSlice } from '@reduxjs/toolkit';
import authInitialState from './auth.state';
import { fetchUser } from './auth.actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice;
