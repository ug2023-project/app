import { Autocomplete } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import useAutocompleteCollection from './useAutocompleteCollection';

const AutocompleteCollection = () => {
  const { t } = useTranslation();
  const { value, handleChange } = useAutocompleteCollection();

  return (
    <Autocomplete
      placeholder={t('Autocomplete_Collection_Placeholder')}
      data={[]}
      value={value}
      onChange={handleChange}
    />
  );
};

export default AutocompleteCollection;
