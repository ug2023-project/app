import Bookmark from '@/types/Bookmark';
import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type CreateBookmark = {
  collectionId: UniqueIdentifier;
  bookmark: Partial<Bookmark>;
};

const createBookmark = createAsyncThunk(
  'bookmarks/createBookmark',
  async ({ collectionId, bookmark }: CreateBookmark) => {
    const { data } = await axios.post<Bookmark>(
      `/collections/${collectionId}/bookmarks`,
      bookmark,
    );
    return data;
  },
);

export default createBookmark;
