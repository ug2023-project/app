import { Modal, Text } from '@mantine/core';
import { createCollection } from '@/containers/Dashboard/ducks/collections/collections.actions';
import { nanoid } from '@reduxjs/toolkit';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import CollectionForm from './CollectionForm';

type CreateCollectionModalProps = {
  parentId: number;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const CreateCollectionModal = ({
  parentId,
  isModalOpen,
  setIsModalOpen,
}: CreateCollectionModalProps) => {
  const dispatch = useTypedDispatch();

  const handleCreateNewCollection = async ({ title }: { title: string }) => {
    dispatch(
      createCollection({ body: { title, parentId }, temporaryId: nanoid() }),
    );
    setIsModalOpen(false);
  };

  return (
    <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Text size="xl" weight={500} mb="md">
        Create new collection
      </Text>
      <CollectionForm
        onSubmit={(values) => handleCreateNewCollection(values)}
      />
    </Modal>
  );
};

export default CreateCollectionModal;
