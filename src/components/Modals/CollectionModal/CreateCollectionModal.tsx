import { Modal, Text } from '@mantine/core';
import CollectionForm from './CollectionForm';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useCreateCollectionMutation } from '../../../services/bookmarks';
import styles from './Modal.module.css';
import { useTranslation } from 'react-i18next';

const CreateCollectionModal = ({
  parentId,
  isModalOpen,
  setIsModalOpen,
}: CreateCollectionModalProps) => {
  const { t } = useTranslation();
  const [createCollection] = useCreateCollectionMutation();

  const handleCreateNewCollection = ({
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
    <Modal
      opened={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className={styles.modal}
      data-testid="create-collection-modal"
    >
      <Text size="xl" weight={500} mb="md" className="text-[#06257f]">
        {t('CreateNewCollection')}
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
