import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import { User } from './types';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const { data } = await axios.get<User>('/auth/me');
  return data;
});
