import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type MoveBookmarks = {
  params: {
    collectionId: UniqueIdentifier;
  };
  body: {
    collectionId: UniqueIdentifier;
    bookmarkIds: UniqueIdentifier[];
  };
};

const moveBookmarksToCollection = createAsyncThunk(
  'bookmarks/moveBookmarks',
  async ({ params, body }: MoveBookmarks) => {
    await axios.post(
      `/collections/${params.collectionId}/move-bookmarks`,
      body,
    );
  },
);

export default moveBookmarksToCollection;
