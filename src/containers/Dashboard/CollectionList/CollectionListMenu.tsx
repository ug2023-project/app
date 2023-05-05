import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Button, Menu } from '@mantine/core';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import collapseAllCollections from '../ducks/collections/actions/collapseAllCollection';

const CollectionListMenu = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dispatch = useTypedDispatch();

  const handleCollapseAll = () => {
    dispatch(collapseAllCollections());
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
        parentId={0}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
      />
    </Menu>
  );
};

export default CollectionListMenu;
