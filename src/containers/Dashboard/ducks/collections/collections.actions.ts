import { EditCollection } from './../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import type CollectionApiResponse from '@/types/CollectionApiResponse';
import { CreateCollection, MoveCollection } from '../types';
import Collection from '@/types/CollectionApi';

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
    const { data } = await axios.post<Collection>('collections', body);
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
  async (collectionIds: number[]) => {
    await axios.put('collections/expand', { collectionIds });
  },
);

export const editCollection = createAsyncThunk(
  'collection/editCollection',
  async (body: EditCollection) => {
    const { data } = await axios.put<Collection>(
      `collections/${body.collectionId}`,
      body.body,
    );
    return data;
  },
);
