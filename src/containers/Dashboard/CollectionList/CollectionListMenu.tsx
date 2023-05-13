import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import { Menu } from '@mantine/core';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useCollapseAllCollectionsMutation } from '../../../services/bookmarks';
import Action from '@/components/dnd-kit/Item/components/Action';

import styles from './CollectionList.module.css';
import { useTranslation } from 'react-i18next';

const CollectionListMenu = () => {
  const { t } = useTranslation();
  const [collapseAllCollections] = useCollapseAllCollectionsMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCollapseAll = () => {
    collapseAllCollections();
  };

  return (
    <Menu
      shadow="md"
      width={200}
      styles={{
        dropdown: {
          background: '#f9f9ff',
        },
      }}
    >
      <div className="flex items-center justify-between px-3">
        <span className="text-main-600">{t('Collections')}</span>
        <Menu.Target>
          <Action>
            <BsThreeDots />
          </Action>
        </Menu.Target>
      </div>

      <Menu.Dropdown
        style={{
          marginLeft: '80px',
        }}
        className={styles.menu}
      >
        <Menu.Item onClick={() => setIsCreateModalOpen(true)}>
          {t('CreateNewCollection')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleCollapseAll}>{t('CollapseAll')}</Menu.Item>
      </Menu.Dropdown>
      <CreateCollectionModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      />
    </Menu>
  );
};

export default CollectionListMenu;
