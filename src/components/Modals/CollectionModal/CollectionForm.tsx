import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Collection from '@/types/Collection';

const CollectionForm = ({ onSubmit, collection }: CollectionFormProps) => {
  const collectionForm = useForm({
    initialValues: {
      title: collection?.title || '',
    },

    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
    },
  });

  return (
    <form onSubmit={collectionForm.onSubmit((values) => onSubmit(values))}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="e.g. Inspiration, shopping.."
        {...collectionForm.getInputProps('title')}
      />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

type CollectionFormProps = {
  onSubmit: ({ title }: { title: string }) => void;
  collection?: Collection;
};

export default CollectionForm;
