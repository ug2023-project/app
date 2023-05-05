import Collection from '@/types/Collection';
import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type CreateCollection = {
  body: {
    title: string;
    parentId: UniqueIdentifier;
  };
};

const createCollection = createAsyncThunk(
  'collection/createCollection',
  async ({ body }: CreateCollection) => {
    const { data } = await axios.post<Collection>('collections', body);
    return data;
  },
);

export default createCollection;
