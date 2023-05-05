import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { Button, Menu } from '@mantine/core';

import styles from './SortMenu.module.css';
import useGetSortOptions from './useGetSortOptions';

const SortMenu = () => {
  const sortOptions = useGetSortOptions();
  return (
    <Menu withArrow>
      <Menu.Target>
        <Button
          leftIcon={<AdjustmentsHorizontalIcon className={styles.icon} />}
          className={styles.button}
        >
          Sort by
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {sortOptions.map((option) => (
          <Menu.Item
            key={option.option}
            icon={option.icon}
            rightSection={option.indicator}
          >
            {option.text}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default SortMenu;
