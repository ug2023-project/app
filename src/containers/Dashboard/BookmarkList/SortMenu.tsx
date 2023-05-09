import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { Button, Menu } from '@mantine/core';

import styles from './SortMenu.module.css';
import useGetSortOptions from './useGetSortOptions';

const SortMenu = () => {
  const { sortOptions, handleSortChange } = useGetSortOptions();
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
        {sortOptions.map(({ option, icon, indicator, text }) => (
          <Menu.Item
            key={option}
            icon={icon}
            rightSection={indicator}
            onClick={() => handleSortChange(option)}
          >
            {text}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default SortMenu;
