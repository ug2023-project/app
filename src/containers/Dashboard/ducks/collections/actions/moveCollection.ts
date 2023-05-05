import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type MoveCollection = {
  body: {
    parentId: UniqueIdentifier | null;
    index: number;
    collectionId: UniqueIdentifier;
  };
};

const moveCollection = createAsyncThunk(
  'collection/moveCollection',
  async ({ body }: MoveCollection) => {
    await axios.post('collections/move', body);
  },
);

export default moveCollection;
