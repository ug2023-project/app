import store from '@/redux/store';
import { LoaderFunctionArgs } from 'react-router-dom';
import { fetchCollectionSearch } from '../ducks/collection.actions';

const bookmarkLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const { collectionId } = params;
  const searchQuery = new URL(request.url).searchParams.get('search');
  return await store.dispatch(fetchCollectionSearch({ collectionId: collectionId ?? '0', searchQuery })).unwrap();
};

export default bookmarkLoader;