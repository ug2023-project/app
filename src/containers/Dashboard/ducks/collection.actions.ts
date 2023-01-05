import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchCollectionParams } from './types';
import axios from '@/utils/axios/axiosConfig';

export const fetchCollectionSearch = createAsyncThunk(
  'collection/fetchCollectionSearch',
  async (params: FetchCollectionParams) => {
    const { data } = await axios.get(`bookmarks/${params.collectionId}`, {
      params: {
        search: params.searchQuery,
      }
    });
    return data ?? [];
  },
);
