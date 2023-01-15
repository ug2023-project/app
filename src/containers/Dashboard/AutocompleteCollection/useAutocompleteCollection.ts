import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useAutocompleteCollection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionSearchParam = searchParams.get('search');

  const [searchCollectionValue, setSearchCollectionValue] = useState(
    collectionSearchParam,
  );

  const handleChange = (value: string) => {
    setSearchCollectionValue(value);
    setSearchParams(value.length ? { search: value } : {});
  };

  return {
    value: searchCollectionValue ?? '',
    handleChange,
  };
};

export default useAutocompleteCollection;
