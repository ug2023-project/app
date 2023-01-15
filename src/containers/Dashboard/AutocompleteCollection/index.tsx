import { Autocomplete } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import useAutocompleteCollection from './useAutocompleteCollection';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';

const AutocompleteCollection = () => {
  const { t } = useTranslation();
  const { value, handleChange } = useAutocompleteCollection();
  const [search, setSearch] = useState(value);
  const [debounced] = useDebouncedValue(search, 350);

  useEffect(() => {
    handleChange(debounced);
  }, [debounced]);

  return (
    <Autocomplete
      placeholder={t('Autocomplete_Collection_Placeholder')}
      data={[]}
      defaultValue={search}
      onChange={setSearch}
    />
  );
};

export default AutocompleteCollection;
