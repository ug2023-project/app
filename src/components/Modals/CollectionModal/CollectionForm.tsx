import { Button, ColorInput, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Collection from '@/types/Collection';
import useColorLocalStorage from '@/hooks/useColorLocalStorage';

const CollectionForm = ({ onSubmit, collection }: CollectionFormProps) => {
  const { colorsLocalStorage, handleColorLocalStorageChange } =
    useColorLocalStorage();

  const collectionForm = useForm({
    initialValues: {
      title: collection?.title || '',
      color: collection?.color || '#00ff4d',
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
        label="Title"
        placeholder="e.g. Inspiration, shopping.."
        {...collectionForm.getInputProps('title')}
      />
      <ColorInput
        format="hex"
        disallowInput
        label="Color"
        swatches={colorsLocalStorage}
        {...collectionForm.getInputProps('color')}
      />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

type CollectionFormProps = {
  onSubmit: ({ title, color }: { title: string; color: string }) => void;
  collection?: Collection;
};

export default CollectionForm;
