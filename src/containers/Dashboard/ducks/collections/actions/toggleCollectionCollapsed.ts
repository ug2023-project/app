import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

const toggleCollectionCollapsed = createAsyncThunk(
  'collection/toggleCollectionCollapsed',
  async (collectionId: UniqueIdentifier) => {
    await axios.post(`collections/${collectionId}/toggle-collapsed`);
  },
);

export default toggleCollectionCollapsed;
