import CreateCollectionModal from '@/components/Modals/CollectionModal/CreateCollectionModal';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { Button, Menu } from '@mantine/core';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { expandCollections } from '../ducks/collections/collections.actions';

const CollectionListMenu = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dispatch = useTypedDispatch();

  const collapseAll = () => {
    dispatch(expandCollections([]));
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs" compact>
          <BsThreeDots />
        </Button>
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
        <Menu.Item onClick={() => collapseAll()}>Collapse all</Menu.Item>
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
