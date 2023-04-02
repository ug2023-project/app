import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { editCollection } from '@/containers/Dashboard/ducks/collections/collections.actions';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { UniqueIdentifier } from '@dnd-kit/core';
import { selectCollectionById } from '@/redux/selectors';
import useTypedSelector from '@/hooks/useTypedSelector';

type EditCollectionModalProps = {
  id: UniqueIdentifier;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const EditCollectionModal = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: EditCollectionModalProps) => {
  const collection = useTypedSelector(selectCollectionById(id));
  const dispatch = useTypedDispatch();

  const handleEditCollection = async ({ title }: { title: string }) => {
    dispatch(editCollection({ body: { title }, collectionId: id }));
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

export default EditCollectionModal;
