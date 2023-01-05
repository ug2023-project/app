import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import { FetchCollectionBookmarksParams } from '../types';
import type Bookmark from '@/types/Bookmark';

export const fetchCollectionBookmarksSearch = createAsyncThunk(
  'bookmark/fetchCollectionBookmarksSearch',
  async (params: FetchCollectionBookmarksParams) => {
    const { data } = await axios.get<Bookmark[]>(` /collections/${params.collectionId}/bookmarks`, {
      params: {
        search: params.searchQuery,
      }
    });
    return data;
  },
);