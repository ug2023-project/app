import {
  ChangeBookmarksOrder,
  CreateBookmark,
  RemoveBookmarkParams,
} from './../types';
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
        params: params.searchQuery
          ? {
              search: params.searchQuery,
            }
          : {},
      },
    );
    return data;
  },
);

export const changeBookmarksOrder = createAsyncThunk(
  'bookmarks/changeBookmarksOrder',
  async ({ params, body }: ChangeBookmarksOrder) => {
    await axios.post(
      `/collections/${params.collectionId}/change-bookmarks-order`,
      body,
    );
  },
);

export const moveBookmarksToCollection = createAsyncThunk(
  'bookmarks/moveBookmarks',
  async ({ params, body }: MoveBookmarks) => {
    await axios.post(
      `/collections/${params.collectionId}/move-bookmarks`,
      body,
    );
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

export const removeBookmark = createAsyncThunk(
  'bookmarks/removeBookmark',
  async ({ collectionId, bookmarkId }: RemoveBookmarkParams) => {
    await axios.delete(`/collections/${collectionId}/bookmarks/${bookmarkId}`);
  },
);
