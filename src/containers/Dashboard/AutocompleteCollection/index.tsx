import { Autocomplete } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import useAutocompleteCollection from './useAutocompleteCollection';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import styles from './Autocomplete.module.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const AutocompleteCollection = () => {
  const { t } = useTranslation();
  const { value, handleChange } = useAutocompleteCollection();
  const [input, setInput] = useState(value);

  const [debounced] = useDebouncedValue(input, 350);

  useEffect(() => {
    handleChange(debounced ?? '');
  }, [debounced, handleChange]);

  return (
    <Autocomplete
      placeholder={t('Autocomplete_Collection_Placeholder')}
      data={[]}
      defaultValue={value}
      value={input}
      onChange={setInput}
      icon={<MagnifyingGlassIcon className="h-4 w-4" />}
      className={styles.autocomplete}
    />
  );
};

export default AutocompleteCollection;
