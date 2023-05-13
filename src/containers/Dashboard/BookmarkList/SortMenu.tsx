import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { Button, Menu } from '@mantine/core';

import styles from './SortMenu.module.css';
import useGetSortOptions from './useGetSortOptions';
import { useTranslation } from 'react-i18next';

const SortMenu = () => {
  const { t } = useTranslation();
  const { sortOptions, handleSortChange } = useGetSortOptions();
  return (
    <Menu
      withArrow
      styles={{
        dropdown: {
          background: '#f9f9ff',
        },
      }}
    >
      <Menu.Target>
        <Button
          leftIcon={<AdjustmentsHorizontalIcon className={styles.icon} />}
          className="bg-[#06257f] hover:bg-[#00175b]"
        >
          {t('Sort_By')}
        </Button>
      </Menu.Target>
      <Menu.Dropdown className={styles.menu}>
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
