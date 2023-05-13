import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useCreateCollectionMutation } from '../../../services/bookmarks';

const CreateCollectionModal = ({
  parentId,
  isModalOpen,
  setIsModalOpen,
}: CreateCollectionModalProps) => {
  const [createCollection] = useCreateCollectionMutation();

  const handleCreateNewCollection = async ({
    title,
    color,
  }: {
    title: string;
    color: string;
  }) => {
    createCollection({ title, color, parentId });
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

type CreateCollectionModalProps = {
  parentId?: UniqueIdentifier | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export default CreateCollectionModal;
