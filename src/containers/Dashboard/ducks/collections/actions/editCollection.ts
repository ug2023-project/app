import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';

type EditCollection = {
  collectionId: UniqueIdentifier;
  body: {
    title: string;
  };
};

const editCollection = createAsyncThunk(
  'collection/editCollection',
  async (body: EditCollection) => {
    const { data } = await axios.put<Collection>(
      `collections/${body.collectionId}`,
      body.body,
    );
    return data;
  },
);

export default editCollection;
