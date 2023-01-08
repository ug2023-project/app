import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import type CollectionApiResponse from '@/types/CollectionApiResponse';
import { MoveCollection } from '../types';

export const fetchAllCollections = createAsyncThunk(
  'collection/fetchAllCollections',
  async () => {
    const { data } = await axios.get<CollectionApiResponse>('collections');
    return data;
  },
);

export const moveCollections = createAsyncThunk(
  'collection/moveCollections',
  async ({ params: { collectionId }, body }: MoveCollection) => {
    await axios.patch(`collections/${collectionId}/move-collections`, body);
  },
);
