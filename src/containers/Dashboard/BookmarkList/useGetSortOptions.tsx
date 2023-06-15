import { useSearchParams } from 'react-router-dom';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  ListBulletIcon,
  TagIcon,
} from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import styles from './SortMenu.module.css';
import { useTranslation } from 'react-i18next';

const useGetSortOptions = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInSearchMode = searchParams.get('search') !== null;
  const selectedSort = searchParams.get('sortBy');

  const baseOptions: SortOption[] = [
    {
      text: t('Date_Added'),
      icon: <ClockIcon className={styles.icon} />,
      indicator: <ChevronUpIcon className={styles.menuRight} />,
      option: 'createdAt',
    },
    {
      text: t('Date_Added'),
      icon: <ClockIcon className={styles.icon} />,
      indicator: <ChevronDownIcon className={styles.menuRight} />,
      option: '-createdAt',
    },
    {
      text: t('Name'),
      icon: <TagIcon className={styles.icon} />,
      indicator: <ChevronUpIcon className={styles.menuRight} />,
      option: 'title',
    },
    {
      text: t('Name'),
      icon: <TagIcon className={styles.icon} />,
      indicator: <ChevronDownIcon className={styles.menuRight} />,
      option: '-title',
    },
  ];

  const baseOption: SortOption = isInSearchMode
    ? {
        text: t('Relevance'),
        icon: <CursorArrowRaysIcon className={styles.icon} />,
        option: 'relevance',
      }
    : {
        text: t('Default'),
        icon: <ListBulletIcon className={styles.icon} />,
        option: 'manual',
      };

  const sortOptions = [baseOption, ...baseOptions];

  const handleSortChange = useCallback(
    (sortBy: string) => {
      setSearchParams(sortBy ? { ...searchParams, sortBy } : searchParams);
    },
    [setSearchParams],
  );

  return { sortOptions, selectedSort, handleSortChange };
};

type SortOption = {
  text: string;
  icon: React.ReactNode;
  indicator?: React.ReactNode;
  option: string;
};

export default useGetSortOptions;
