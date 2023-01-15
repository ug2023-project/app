import TreeCollection from '@/types/TreeCollection';
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CollectionFormProps {
  onSubmit: ({ title }: { title: string }) => void;
  node?: TreeCollection;
}

const CollectionForm = ({ onSubmit, node }: CollectionFormProps) => {
  const collectionForm = useForm({
    initialValues: {
      title: node?.text || '',
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

export default CollectionForm;
