import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

const useAutocompleteCollection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = useCallback(
    (value: string) => {
      if (!value) {
        searchParams.delete('search');
      } else {
        searchParams.set('search', value);
      }
      setSearchParams(searchParams);
    },
    [setSearchParams],
  );

  return {
    value: searchParams.get('search') ?? '',
    handleChange,
  };
};

export default useAutocompleteCollection;
