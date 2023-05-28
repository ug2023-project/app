import { Button, ColorInput, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Collection from '@/types/Collection';
import useColorLocalStorage from '@/hooks/useColorLocalStorage';

import styles from './Form.module.css';
import { useTranslation } from 'react-i18next';

const CollectionForm = ({ onSubmit, collection }: CollectionFormProps) => {
  const { t } = useTranslation();
  const { colorsLocalStorage, handleColorLocalStorageChange } =
    useColorLocalStorage();

  const collectionForm = useForm({
    initialValues: {
      title: collection?.title || '',
      color: collection?.color?.trim() || '#00ff4d',
    },

    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
    },
  });

  return (
    <form
      onSubmit={collectionForm.onSubmit((values) => {
        onSubmit(values);
        handleColorLocalStorageChange(values.color);
      })}
    >
      <TextInput
        withAsterisk
        label={t('Collection_Name')}
        placeholder={t('Collection_Name_Placeholder')}
        className={styles.input}
        data-testid="create-collection-input"
        {...collectionForm.getInputProps('title')}
      />
      <ColorInput
        format="hex"
        disallowInput
        label={t('Color')}
        swatches={colorsLocalStorage}
        className={styles.input}
        {...collectionForm.getInputProps('color')}
      />
      <Group position="right" mt="md">
        <Button
          type="submit"
          className="bg-[#06257f] hover:bg-[#00175b]"
          data-testid="create-collection-btn"
        >
          {t('Submit')}
        </Button>
      </Group>
    </form>
  );
};

type CollectionFormProps = {
  onSubmit: ({ title, color }: { title: string; color: string }) => void;
  collection?: Collection;
};

export default CollectionForm;
