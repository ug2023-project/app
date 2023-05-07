import {
  createApi,
  defaultSerializeQueryArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Collection from '@/types/Collection';
import { arrayMove } from '@dnd-kit/sortable';
import { REHYDRATE } from 'redux-persist';
import Bookmark from '@/types/Bookmark';
import { UniqueIdentifier } from '@dnd-kit/core';
import { copy } from 'copy-anything';

const TEMPORARY_ID = 'TEMPORARY_ID';
const createTemporaryCollection = (
  title: string,
  parentId?: UniqueIdentifier | null,
): Collection => ({
  id: TEMPORARY_ID,
  parentId: parentId ?? null,
  bookmarks: [],
  title,
  cover: null,
  color: null,
  deleted: false,
  collapsed: false,
  authorId: -1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  public: false,
  view: 'LIST',
});

const COLLECTION_TAG = 'Collection' as const;
const BOOKMARK_TAG = 'Bookmark' as const;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),

  reducerPath: 'bookmarksApi',

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },

  tagTypes: [COLLECTION_TAG, BOOKMARK_TAG],

  endpoints: (build) => ({
    getCollections: build.query<Collection[], void>({
      query: () => 'collections',
    }),

    createCollection: build.mutation<
      { id: UniqueIdentifier },
      CreateCollection
    >({
      query: (body) => ({
        url: 'collections',
        method: 'POST',
        body,
      }),
      async onQueryStarted({ title, parentId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const parentCollectionIndex = draft.findIndex(
              (collection) => collection.id === parentId,
            );
            const newCollection = createTemporaryCollection(title, parentId);
            draft.splice(parentCollectionIndex + 1, 0, newCollection);
          }),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getCollections', undefined, (draft) => {
              const parentCollectionIndex = draft.findIndex(
                (collection) => collection.id === parentId,
              );
              draft[parentCollectionIndex + 1].id = data.id;
            }),
          );
        } catch {
          patchResult.undo();
        }
      },
    }),

    moveCollection: build.mutation<void, MoveCollection>({
      query: (body) => ({
        url: 'collections/move',
        method: 'POST',
        body,
      }),
      async onQueryStarted(
        { collectionId, parentId, index },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const collectionIndex = draft.findIndex(
              (collection) => collection.id === collectionId,
            );
            const parentCollection = draft.find(
              (collection) => collection.id === parentId,
            );
            if (collectionIndex === -1 || (parentId && !parentCollection))
              return;

            draft = arrayMove(draft, collectionIndex, index);
            return draft;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    toggleCollectionCollapsed: build.mutation<void, UniqueIdentifier>({
      query: (collectionId) => ({
        url: `collections/${collectionId}/toggle-collapsed`,
        method: 'POST',
      }),
      async onQueryStarted(collectionId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const collection = draft.find(
              (collection) => collection.id === collectionId,
            );
            if (!collection) return;
            collection.collapsed = !collection.collapsed;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    collapseAllCollections: build.mutation<void, void>({
      query: () => ({
        url: 'collections/collapse-all',
        method: 'POST',
      }),
      async onQueryStarted(collectionId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            draft.forEach((collection) => {
              collection.collapsed = true;
            });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateCollection: build.mutation<void, UpdateCollection>({
      query: ({ id, ...patch }) => ({
        url: `collections/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const collection = draft.find((collection) => collection.id === id);
            if (!collection) return;
            Object.assign(collection, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    getBookmarks: build.query<Bookmark[], GetBookmarksQuery>({
      query: ({ collectionId, sort, ...params }) => ({
        url: `collections/${collectionId}/bookmarks`,
        params,
      }),
      serializeQueryArgs: ({
        queryArgs: { collectionId },
        endpointDefinition,
        endpointName,
      }) =>
        defaultSerializeQueryArgs({
          endpointName,
          queryArgs: { collectionId },
          endpointDefinition,
        }),
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
    }),

    changeBookmarksOrder: build.mutation<void, ChangeBookmarksOrder>({
      query: ({ collectionId, ...patch }) => ({
        url: `collections/${collectionId}/change-bookmarks-order`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted(
        { collectionId, bookmarkId, index },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            'getBookmarks',
            { collectionId },
            (draft) => {
              const bookmarkIndex = draft.findIndex(
                (bookmark) => bookmark.id === bookmarkId,
              );
              draft = arrayMove(draft, bookmarkIndex, index);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // deletePost: build.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `posts/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    // }),
  }),
});

export const {
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
  useCreateCollectionMutation,
  useMoveCollectionMutation,
  useToggleCollectionCollapsedMutation,
  useCollapseAllCollectionsMutation,
  useGetBookmarksQuery,
} = api;

type GetBookmarksQuery = {
  collectionId: UniqueIdentifier;
  search?: string;
  sort?: 'manual' | 'createdAt' | '-createdAt';
  page?: number;
  limit?: number;
};

type CreateBookmark = {
  link: string;
  collectionId: UniqueIdentifier;
};

type UpdateBookmark = {
  id: UniqueIdentifier;
  title?: string;
  description?: string;
  tags?: string[];
};

type CreateCollection = {
  title: string;
  parentId?: UniqueIdentifier | null;
};

type UpdateCollection = {
  id: UniqueIdentifier;
  title: string;
};

type MoveCollection = {
  collectionId: UniqueIdentifier;
  parentId: UniqueIdentifier | null;
  index: number;
};

type ChangeBookmarksOrder = {
  collectionId: UniqueIdentifier;
  bookmarkId: UniqueIdentifier;
  index: number;
};

type MoveBookmark = {
  collectionId: UniqueIdentifier;
  bookmarkId: UniqueIdentifier;
  newCollectionId: UniqueIdentifier;
};
