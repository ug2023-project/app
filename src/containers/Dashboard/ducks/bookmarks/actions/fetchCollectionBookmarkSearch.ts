import Bookmark from '@/types/Bookmark';
import axios from '@/utils/axios/axiosConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createAsyncThunk } from '@reduxjs/toolkit';

type FetchCollectionBookmarksParams = {
  collectionId: UniqueIdentifier;
  searchQuery: string | null;
};

const fetchCollectionBookmarksSearch = createAsyncThunk(
  'bookmarks/fetchCollectionBookmarksSearch',
  async (params: FetchCollectionBookmarksParams) => {
    const { data } = await axios.get<Bookmark[]>(
      `/collections/${params.collectionId}/bookmarks`,
      {
        params: params.searchQuery
          ? {
              search: params.searchQuery,
            }
          : {},
      },
    );
    return data;
  },
);

export default fetchCollectionBookmarksSearch;
