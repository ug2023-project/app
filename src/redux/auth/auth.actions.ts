import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import { User } from './types';
import { AxiosError } from 'axios';

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (obj, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get<User>('/auth/me');
      return fulfillWithValue(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ status: error.response?.status });
      }
      return rejectWithValue(error);
    }
  },
);
