import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { UniqueIdentifier } from '@dnd-kit/core';
import {
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
} from '../../../services/bookmarks';

import styles from './Modal.module.css';
import { useTranslation } from 'react-i18next';

const EditCollectionModal = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: EditCollectionModalProps) => {
  const { t } = useTranslation();
  const { data: collections } = useGetCollectionsQuery();
  const collection = collections?.find((c) => c.id === id);
  const [updateCollection] = useUpdateCollectionMutation();

  const handleEditCollection = async ({
    title,
    color,
  }: {
    title: string;
    color: string;
  }) => {
    updateCollection({ id, color, title });
    setIsModalOpen(false);
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className={styles.modal}
    >
      <Text size="xl" weight={500} mb="md" className="text-[#06257f]">
        {t('EditCollection')}
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
