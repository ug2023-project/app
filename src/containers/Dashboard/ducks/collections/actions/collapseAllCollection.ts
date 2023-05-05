import axios from '@/utils/axios/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

const collapseAllCollections = createAsyncThunk(
  'collection/collapseAllCollections',
  async () => {
    await axios.post(`collections/collapse-all`);
  },
);

export default collapseAllCollections;
