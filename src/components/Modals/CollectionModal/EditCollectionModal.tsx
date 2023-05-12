import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { UniqueIdentifier } from '@dnd-kit/core';
import {
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
} from '../../../services/bookmarks';

const EditCollectionModal = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: EditCollectionModalProps) => {
  const { data: collections } = useGetCollectionsQuery();
  const collection = collections?.find((c) => c.id === id);
  const [updateCollection] = useUpdateCollectionMutation();

  const handleEditCollection = async ({ title }: { title: string }) => {
    updateCollection({ id, title });
    setIsModalOpen(false);
  };

  return (
    <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Text size="xl" weight={500} mb="md">
        Edit collection
      </Text>
      <CollectionForm
        onSubmit={(values) => handleEditCollection(values)}
        collection={collection}
      />
    </Modal>
  );
};

type EditCollectionModalProps = {
  id: UniqueIdentifier;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export default EditCollectionModal;
