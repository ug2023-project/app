import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

const useAutocompleteCollection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = useCallback(
    (value: string) => {
      setSearchParams(value ? { search: value } : {});
    },
    [setSearchParams],
  );

  return {
    value: searchParams.get('search') ?? '',
    handleChange,
  };
};

export default useAutocompleteCollection;
