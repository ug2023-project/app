import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useCreateCollectionMutation } from '../../../services/bookmarks';

type CreateCollectionModalProps = {
  parentId?: UniqueIdentifier | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const CreateCollectionModal = ({
  parentId,
  isModalOpen,
  setIsModalOpen,
}: CreateCollectionModalProps) => {
  const [createCollection] = useCreateCollectionMutation();

  const handleCreateNewCollection = async ({ title }: { title: string }) => {
    createCollection({ title, parentId });
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
