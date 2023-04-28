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
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      const { payload } = action;
      if (
        payload &&
        typeof payload === 'object' &&
        'status' in payload &&
        payload.status === 401
      ) {
        state.user = null;
      }
      state.loading = false;
    });
  },
});

export default authSlice;
