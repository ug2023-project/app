import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createCollection } from '@/containers/Dashboard/ducks/collections/collections.actions';
import { nanoid } from '@reduxjs/toolkit';
import { CollectionId } from '@/types/TreeCollection';
import useTypedDispatch from '@/hooks/useTypedDispatch';

type CreateCollectionModalProps = {
  parentId: CollectionId;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const CreateCollectionModal = ({
  parentId,
  isModalOpen,
  setIsModalOpen,
}: CreateCollectionModalProps) => {
  const dispatch = useTypedDispatch();

  const newCollectionForm = useForm({
    initialValues: {
      title: '',
    },

    validate: {
      title: (value) => (value.length > 0 ? null : 'Title is required'),
    },
  });

  const handleCreateNewCollection = async ({ title }: { title: string }) => {
    dispatch(
      createCollection({ body: { title, parentId }, temporaryId: nanoid() }),
    );
    setIsModalOpen(false);
  };

  return (
    <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <form
        onSubmit={newCollectionForm.onSubmit((values) =>
          handleCreateNewCollection(values),
        )}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="e.g. Inspiration, shopping.."
          {...newCollectionForm.getInputProps('title')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateCollectionModal;
