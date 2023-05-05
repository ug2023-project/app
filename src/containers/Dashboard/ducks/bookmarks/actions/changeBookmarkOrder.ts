import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ChangeBookmarksOrder = {
  params: {
    collectionId: UniqueIdentifier;
  };
  body: {
    index: number;
    bookmarkIds: UniqueIdentifier[];
  };
};

const changeBookmarksOrder = createAsyncThunk(
  'bookmarks/changeBookmarksOrder',
  async ({ params, body }: ChangeBookmarksOrder) => {
    await axios.post(
      `/collections/${params.collectionId}/change-bookmarks-order`,
      body,
    );
  },
);

export default changeBookmarksOrder;
