import { CreateBookmark } from './../types';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import { FetchCollectionBookmarksParams, MoveBookmarks } from '../types';
import type Bookmark from '@/types/Bookmark';

export const fetchCollectionBookmarksSearch = createAsyncThunk(
  'bookmarks/fetchCollectionBookmarksSearch',
  async (params: FetchCollectionBookmarksParams) => {
    const { data } = await axios.get<Bookmark[]>(
      `/collections/${params.collectionId}/bookmarks`,
      {
        params: {
          search: params.searchQuery,
        },
      },
    );
    return data;
  },
);

export const updateSelectedBookmarks = createAction(
  'bookmarks/updateSelectedBookmarks',
  (selected: number[]) => ({
    payload: selected,
  }),
);

export const moveBookmarksToCollection = createAsyncThunk(
  'bookmarks/moveBookmarksToCollection',
  async ({ params, body }: MoveBookmarks) => {
    await axios.put(`/collections/${params.collectionId}/bookmarks`, body);
  },
);

export const createBookmark = createAsyncThunk(
  'bookmarks/createBookmark',
  async ({ collectionId, bookmark }: CreateBookmark) => {
    const { data } = await axios.post<Bookmark>(
      `/collections/${collectionId}/bookmarks`,
      bookmark,
    );
    return data;
  },
);
