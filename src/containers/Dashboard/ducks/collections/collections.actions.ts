import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import type CollectionApiResponse from '@/types/CollectionApiResponse';
import { CreateCollection, MoveCollection } from '../types';
import { CollectionId } from '@/types/TreeCollection';
import CollectionApi from '@/types/CollectionApi';

export const fetchAllCollections = createAsyncThunk(
  'collection/fetchAllCollections',
  async () => {
    const { data } = await axios.get<CollectionApiResponse>('collections');
    return data;
  },
);

export const createCollection = createAsyncThunk(
  'collection/createCollection',
  async ({ body }: CreateCollection) => {
    const { data } = await axios.post<CollectionApi>('collections', body);
    return data;
  },
);

export const moveCollections = createAsyncThunk(
  'collection/moveCollections',
  async ({ body }: MoveCollection) => {
    await axios.put('collections/children-order', body);
  },
);

export const expandCollections = createAsyncThunk(
  'collection/expandCollections',
  async (collectionIds: CollectionId[]) => {
    await axios.put('collections/expand', { collectionIds });
  },
);
