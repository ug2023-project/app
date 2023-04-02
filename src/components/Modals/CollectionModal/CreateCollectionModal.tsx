import { Modal, Text } from '@mantine/core';
import { createCollection } from '@/containers/Dashboard/ducks/collections/collections.actions';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import CollectionForm from './CollectionForm';
import { UniqueIdentifier } from '@dnd-kit/core';

type CreateCollectionModalProps = {
  parentId: UniqueIdentifier;
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
    dispatch(createCollection({ body: { title, parentId } }));
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
