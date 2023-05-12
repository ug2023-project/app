import { useSearchParams } from 'react-router-dom';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  ListBulletIcon,
  TagIcon,
} from '@heroicons/react/24/solid';

import styles from './SortMenu.module.css';
import { useCallback } from 'react';

const baseOptions: SortOption[] = [
  {
    text: 'Date added',
    icon: <ClockIcon className={styles.icon} />,
    indicator: <ChevronUpIcon className={styles.menuRight} />,
    option: 'createdAt',
  },
  {
    text: 'Date added',
    icon: <ClockIcon className={styles.icon} />,
    indicator: <ChevronDownIcon className={styles.menuRight} />,
    option: '-createdAt',
  },
  {
    text: 'Name',
    icon: <TagIcon className={styles.icon} />,
    indicator: <ChevronUpIcon className={styles.menuRight} />,
    option: 'name',
  },
  {
    text: 'Name',
    icon: <TagIcon className={styles.icon} />,
    indicator: <ChevronDownIcon className={styles.menuRight} />,
    option: '-name',
  },
];

const useGetSortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInSearchMode = searchParams.get('search') !== null;
  const selectedSort = searchParams.get('sortBy');

  const handleSortChange = useCallback(
    (sortBy: string) => {
      setSearchParams(sortBy ? { ...searchParams, sortBy } : searchParams);
    },
    [setSearchParams],
  );

  const baseOption: SortOption = isInSearchMode
    ? {
        text: 'Relevance',
        icon: <CursorArrowRaysIcon className={styles.icon} />,
        option: 'relevance',
      }
    : {
        text: 'Default',
        icon: <ListBulletIcon className={styles.icon} />,
        option: 'default',
      };

  const sortOptions = [baseOption, ...baseOptions];

  return { sortOptions, selectedSort, handleSortChange };
};

type SortOption = {
  text: string;
  icon: React.ReactNode;
  indicator?: React.ReactNode;
  option: string;
};

export default useGetSortOptions;
