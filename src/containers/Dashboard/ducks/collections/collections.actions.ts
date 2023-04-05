import { DndOptions, EditCollection, TreeDndOptions } from './../types';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios/axiosConfig';
import type CollectionApiResponse from '@/types/CollectionApiResponse';
import { CreateCollection, MoveCollection } from '../types';
import Collection from '@/types/Collection';
import { UniqueIdentifier } from '@dnd-kit/core';

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

export const moveCollection = createAsyncThunk(
  'collection/moveCollection',
  async ({ body }: MoveCollection) => {
    await axios.put('collections/children-order', body);
  },
);

export const toggleCollectionCollapsed = createAsyncThunk(
  'collection/toggleCollectionCollapsed',
  async (collectionId: UniqueIdentifier) => {
    await axios.put(`collections/toggle-collapsed/${collectionId}`);
  },
);

export const collapseAllCollections = createAsyncThunk(
  'collection/collapseAllCollections',
  async () => {
    await axios.put(`collections/collapse-all`);
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

export const updateDndOptions = createAction(
  'collection/updateDndOptions',
  (options: Partial<TreeDndOptions>) => ({
    payload: options,
  }),
);
