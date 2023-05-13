import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Collection from '@/types/Collection';
import { arrayMove } from '@dnd-kit/sortable';
import { REHYDRATE } from 'redux-persist';
import Bookmark from '@/types/Bookmark';
import { UniqueIdentifier } from '@dnd-kit/core';
import { copy } from 'copy-anything';
import equal from 'fast-deep-equal';
import axios from '../utils/axios/axiosConfig';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { XMarkIcon } from '@heroicons/react/24/solid';

const TEMPORARY_ID = 'TEMPORARY_ID';
const createTemporaryCollection = (
  title: string,
  color: string,
  parentId?: UniqueIdentifier | null,
): Collection => ({
  id: TEMPORARY_ID,
  parentId: parentId ?? null,
  title,
  cover: null,
  color,
  count: 0,
  collapsed: false,
  createdAt: new Date().toISOString(),
  authorId: '',
});

const COLLECTION_TAG = 'Collection' as const;
const BOOKMARK_TAG = 'Bookmark' as const;

const DEFAULT_COLLECTIONS_OFFSET = 3;

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
      async onQueryStarted(
        { title, parentId, color },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const parentCollectionIndex = draft.findIndex(
              (collection) => collection.id === parentId,
            );
            const newCollection = createTemporaryCollection(
              title,
              color,
              parentId,
            );
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
            if (collectionIndex === -1 || (parentId && !parentCollection)) {
              return;
            }

            const newDraft = copy(draft);
            const collection = newDraft[collectionIndex];
            collection.parentId = parentId;
            draft = arrayMove(
              newDraft,
              collectionIndex,
              index + DEFAULT_COLLECTIONS_OFFSET,
            );

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
      query: ({ collectionId, ...params }) => ({
        url: `collections/${collectionId}/bookmarks`,
        params,
      }),
      // serializeQueryArgs: ({
      //   queryArgs: { collectionId },
      //   endpointDefinition,
      //   endpointName,
      // }) =>
      //   defaultSerializeQueryArgs({
      //     endpointName,
      //     queryArgs: { collectionId },
      //     endpointDefinition,
      //   }),
      serializeQueryArgs: ({ queryArgs: { collectionId } }) => collectionId,
      // merge: (currentCache, newItems) => {
      //   currentCache.push(...newItems);
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   return equal(currentArg, previousArg);
      // },
    }),

    changeBookmarksOrder: build.mutation<void, ChangeBookmarksOrder>({
      query: ({ collectionId, ...patch }) => ({
        url: `collections/${collectionId}/change-bookmarks-order`,
        method: 'POST',
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
              return draft;
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

    addBookmarkToFavorite: build.mutation<void, AddBookmarkToFavorite>({
      query: ({ bookmarkId }) => ({
        url: `bookmarks/${bookmarkId}/favorite`,
        method: 'POST',
      }),
      async onQueryStarted(
        { bookmarkId, collectionId, favorite },
        { dispatch, queryFulfilled },
      ) {
        const patchBookmark = dispatch(
          api.util.updateQueryData(
            'getBookmarks',
            { collectionId },
            (draft) => {
              const bookmarkToPatch = draft.find((x) => x.id === bookmarkId);

              if (!bookmarkToPatch) {
                throw new Error('Bookmark not found, should not be there');
              }

              bookmarkToPatch.favorite = !bookmarkToPatch.favorite;
            },
          ),
        );
        try {
          await queryFulfilled;
          notifications.show({
            color: 'teal',
            title: 'Success',
            message: favorite ? 'Added to favorites' : 'Removed from favorites',
            icon: <IconCheck size="1rem" />,
            autoClose: 1500,
          });
        } catch {
          notifications.show({
            color: 'red',
            title: 'Fail',
            message: favorite
              ? 'Failed to add to favorites'
              : 'Failed to remove from favorites',
            icon: <XMarkIcon className="h-4 w-4" />,
            autoClose: 1500,
          });
          patchBookmark.undo();
        }
      },
    }),

    moveBookmark: build.mutation<void, MoveBookmark>({
      query: ({ collectionId, ...patch }) => ({
        url: `collections/${collectionId}/move-bookmark`,
        method: 'POST',
        body: {
          bookmarkId: patch.bookmarkId,
          collectionId: patch.newCollectionId,
        },
      }),
      async onQueryStarted(
        { collectionId, bookmarkId, newCollectionId },
        { dispatch, queryFulfilled },
      ) {
        if (collectionId === newCollectionId) return;
        if (collectionId === 'all' || newCollectionId === 'all') return;
        if (collectionId === 'trash' || newCollectionId === 'trash') return;
        const patchBookmarks = dispatch(
          api.util.updateQueryData(
            'getBookmarks',
            { collectionId },
            (draft) => {
              draft = draft.filter((bookmark) => bookmark.id !== bookmarkId);
              return draft;
            },
          ),
        );
        const patchCollections = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const collection = draft.find(
              (collection) => collection.id === collectionId,
            );
            if (!collection) return;
            collection.count -= 1;
            const newCollection = draft.find(
              (collection) => collection.id === newCollectionId,
            );
            if (!newCollection) return;
            newCollection.count += 1;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchBookmarks.undo();
          patchCollections.undo();
        }
      },
    }),

    removeBookmark: build.mutation<
      void,
      { collectionId: UniqueIdentifier; bookmarkId: UniqueIdentifier }
    >({
      query: ({ bookmarkId }) => ({
        url: `bookmarks/${bookmarkId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(
        { collectionId, bookmarkId },
        { dispatch, queryFulfilled },
      ) {
        const patchBookmarks = dispatch(
          api.util.updateQueryData(
            'getBookmarks',
            { collectionId },
            (draft) => {
              draft = draft.filter((bookmark) => bookmark.id !== bookmarkId);
              return draft;
            },
          ),
        );
        const patchCollections = dispatch(
          api.util.updateQueryData('getCollections', undefined, (draft) => {
            const trash = draft.find((collection) => collection.id === 'trash');
            if (!trash) return;
            trash.count += collectionId === 'trash' ? -1 : 1;
            const collection = draft.find(
              (collection) => collection.id === collectionId,
            );
            if (!collection) return;
            collection.count += collectionId !== 'trash' ? -1 : 0;
            const all = draft.find((collection) => collection.id === 'all');
            if (!all) return;
            all.count -= collectionId === 'trash' ? 0 : 1;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchBookmarks.undo();
          patchCollections.undo();
        }
      },
    }),

    updateBookmark: build.mutation<void, UpdateBookmark>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: ({ bookmarkId, collectionId, ...body }) => ({
        url: `bookmarks/${bookmarkId}`,
        method: 'PUT',
        body,
      }),

      async onQueryStarted(
        { bookmarkId, collectionId, onFinish, ...patch },
        { dispatch, queryFulfilled },
      ) {
        notifications.show({
          id: 'process-edit-bookmark',
          loading: true,
          title: 'Editing bookmark is being processed',
          message: 'It may take a while',
          autoClose: false,
          withCloseButton: false,
        });
        const patchBookmark = dispatch(
          api.util.updateQueryData(
            'getBookmarks',
            { collectionId },
            (draft) => {
              const bookmarkToPatch = draft.find((x) => x.id === bookmarkId);

              if (!bookmarkToPatch) {
                throw new Error('Bookmark not found, should not be there');
              }

              Object.assign(bookmarkToPatch, patch);
            },
          ),
        );
        try {
          await queryFulfilled;
          notifications.update({
            id: 'process-edit-bookmark',
            color: 'teal',
            loading: false,
            title: 'Success',
            message: 'Edited bookmark successfully',
            autoClose: 1500,
            withCloseButton: true,
          });
          onFinish?.();
        } catch {
          notifications.update({
            id: 'process-edit-bookmark',
            color: 'red',
            title: 'Fail',
            message: 'Failed to edit bookmark',
            icon: <XMarkIcon className="h-4 w-4" />,
            autoClose: 1500,
            withCloseButton: true,
          });
          patchBookmark.undo();
        }
      },
    }),

    createBookmark: build.mutation<{ id: UniqueIdentifier }, CreateBookmark>({
      query: (body) => ({
        url: 'bookmarks',
        method: 'POST',
        body,
      }),

      async onQueryStarted({ collectionId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { id },
          } = await queryFulfilled;

          notifications.show({
            id: 'process-bookmark',
            loading: true,
            title: 'Bookmark is being processed',
            message: 'It may take a while',
            autoClose: false,
            withCloseButton: false,
          });

          let count = 0;
          const interval = setInterval(async () => {
            try {
              const { data: bookmark } = await axios.get<Bookmark>(
                `/bookmarks/${id}`,
              );
              if (bookmark.status === 'SUCCESS') {
                clearInterval(interval);
                notifications.update({
                  id: 'process-bookmark',
                  color: 'teal',
                  title: 'Bookmark processed',
                  message: 'Bookmark has been processed successfully',
                  icon: <IconCheck size="1rem" />,
                  autoClose: 2000,
                });
                dispatch(
                  api.util.updateQueryData(
                    'getBookmarks',
                    { collectionId: collectionId },
                    (draft) => {
                      draft.unshift(bookmark);
                    },
                  ),
                );

                dispatch(
                  api.util.updateQueryData(
                    'getCollections',
                    undefined,
                    (draft) => {
                      const collection = draft.find(
                        (collection) => collection.id === bookmark.collectionId,
                      );
                      if (!collection) return;
                      collection.count += 1;
                      const all = draft.find(
                        (collection) => collection.id === 'all',
                      );
                      if (!all) return;
                      all.count += 1;
                    },
                  ),
                );
              }
            } catch {}
            if (count > 5) {
              clearInterval(interval);
              notifications.show({
                id: 'process-bookmark',
                title: 'Processing error',
                message: 'Failed to process bookmark',
                color: 'red',
                autoClose: 2000,
              });
            }
            count++;
          }, 2000);
        } catch {
          notifications.show({
            title: 'API error',
            message: 'Failed to create bookmark',
            color: 'red',
          });
        }
      },
    }),

    uploadFile: build.mutation<Bookmark, UploadFile>({
      query: (body) => ({
        url: 'bookmarks/file',
        method: 'POST',
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newBookmark } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData(
              'getBookmarks',
              { collectionId: newBookmark.collectionId },
              (draft) => {
                draft.unshift(newBookmark);
              },
            ),
          );
          dispatch(
            api.util.updateQueryData('getCollections', undefined, (draft) => {
              const collection = draft.find(
                (collection) => collection.id === newBookmark.collectionId,
              );
              if (!collection) return;
              collection.count += 1;
            }),
          );
        } catch {}
      },
    }),
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
  useChangeBookmarksOrderMutation,
  useRemoveBookmarkMutation,
  useMoveBookmarkMutation,
  useCreateBookmarkMutation,
  useUploadFileMutation,
  useAddBookmarkToFavoriteMutation,
  useUpdateBookmarkMutation,
} = api;

type GetBookmarksQuery = {
  collectionId: UniqueIdentifier;
  search?: string | null;
  sort?: 'manual' | 'createdAt' | '-createdAt' | string;
  page?: number | null;
};

type CreateBookmark = {
  link: string;
  collectionId: UniqueIdentifier;
};

type UploadFile = FormData;

type UpdateBookmark = {
  bookmarkId: UniqueIdentifier;
  collectionId: UniqueIdentifier;
  title?: string;
  description?: string;
  tags?: string[];
  onFinish?: () => void;
};

type CreateCollection = {
  title: string;
  parentId?: UniqueIdentifier | null;
  color: string;
};

type UpdateCollection = {
  id: UniqueIdentifier;
  title: string;
  color: string;
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

type AddBookmarkToFavorite = {
  collectionId: UniqueIdentifier;
  bookmarkId: UniqueIdentifier;
  favorite: boolean;
};
