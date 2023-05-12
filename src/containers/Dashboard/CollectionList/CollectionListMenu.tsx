import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import { Button, Menu } from '@mantine/core';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useCollapseAllCollectionsMutation } from '../../../services/bookmarks';

const CollectionListMenu = () => {
  const [collapseAllCollections] = useCollapseAllCollectionsMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCollapseAll = () => {
    collapseAllCollections();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          Collections
          <Button size="xs" compact>
            <BsThreeDots />
          </Button>
        </div>
      </Menu.Target>

      <Menu.Dropdown
        style={{
          marginLeft: '80px',
        }}
      >
        <Menu.Item onClick={() => setIsCreateModalOpen(true)}>
          Create new collection
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleCollapseAll}>Collapse all</Menu.Item>
      </Menu.Dropdown>
      <CreateCollectionModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      />
    </Menu>
  );
};

export default CollectionListMenu;
