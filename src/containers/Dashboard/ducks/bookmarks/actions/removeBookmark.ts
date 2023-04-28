import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type RemoveBookmarkParams = {
  collectionId: UniqueIdentifier;
  bookmarkId: UniqueIdentifier;
};

const removeBookmark = createAsyncThunk(
  'bookmarks/removeBookmark',
  async ({ collectionId, bookmarkId }: RemoveBookmarkParams) => {
    await axios.delete(`/collections/${collectionId}/bookmarks/${bookmarkId}`);
  },
);

export default removeBookmark;
