import Collection from '@/types/Collection';
import axios from '@/utils/axios/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

type CollectionApiResponse = {
  collections: Collection[];
  collectionsOrder: number[];
};

const fetchAllCollections = createAsyncThunk(
  'collection/fetchAllCollections',
  async () => {
    const { data } = await axios.get<CollectionApiResponse>('collections');
    return data;
  },
);

export default fetchAllCollections;
