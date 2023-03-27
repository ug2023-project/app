import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { editCollection } from '@/containers/Dashboard/ducks/collections/collections.actions';
import useTypedDispatch from '@/hooks/useTypedDispatch';

type EditCollectionModalProps = {
  node?: any;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const EditCollectionModal = ({
  isModalOpen,
  node,
  setIsModalOpen,
}: EditCollectionModalProps) => {
  const dispatch = useTypedDispatch();

  const handleEditCollection = async ({ title }: { title: string }) => {
    dispatch(editCollection({ body: { title }, collectionId: node.id }));
    setIsModalOpen(false);
  };

  return (
    <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Text size="xl" weight={500} mb="md">
        Edit collection
      </Text>
      <CollectionForm
        onSubmit={(values) => handleEditCollection(values)}
        node={node}
      />
    </Modal>
  );
};

export default EditCollectionModal;
