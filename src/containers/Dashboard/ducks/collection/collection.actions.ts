import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import type Collection from '@/types/Collection';

export const fetchAllCollections = createAsyncThunk(
  'collection/fetchAllCollections',
  async () => {
    const { data } = await axios.get<Collection[]>('collections');
    return data;
  },
);