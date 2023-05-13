import { Popover, Button, TextInput } from '@mantine/core';
import styles from './SearchBar.module.css';
import AutocompleteCollection from '../AutocompleteCollection';
import { useEffect } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useValidatedState } from '@mantine/hooks';
import { useCreateBookmarkMutation } from '../../../services/bookmarks';
import LanguageSelect from '@/components/LanguageSelect';
import { useTranslation } from 'react-i18next';

const handleDefaultValue = async () => {
  const clipboard = await navigator.clipboard.readText();
  const isUrl = clipboard.startsWith('http');
  return isUrl ? clipboard : '';
};

const SearchBar = () => {
  const { t } = useTranslation();
  const [createBookmark] = useCreateBookmarkMutation();
  const [{ value, valid }, setValue] = useValidatedState(
    '',
    (value) => {
      const urlRegex = new RegExp(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
      );
      return urlRegex.test(value) || value === '';
    },
    true,
  );

  const { collectionId } = useParams();

  const createBookmarkHandler = (url: string) => {
    if (collectionId === undefined) return;
    createBookmark({ collectionId, link: url });
    setValue('');
  };

  useEffect(() => {
    handleDefaultValue().then((value) => setValue(value));
  }, []);

  return (
    <header className={styles.searchBar}>
      <nav className={styles.mainNav}>
        <ul className={styles.settingsList}>
          <li>
            <AutocompleteCollection />
          </li>
        </ul>
      </nav>
      <nav className={styles.mainNav}>
        <LanguageSelect />
        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button
              variant="filled"
              leftIcon={<BsFillStarFill />}
              className="bg-[#06257f] hover:bg-[#00175b]"
            >
              {t('Add')}
            </Button>
          </Popover.Target>
          <Popover.Dropdown className="bg-[#f9f9ff]">
            <TextInput
              label="URL"
              placeholder="https://"
              size="xs"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              error={!valid && 'Invalid URL'}
              className={styles.input}
            />
            <Button
              color="blue"
              onClick={() => createBookmarkHandler(value)}
              disabled={!valid || value === ''}
              className="mt-2 bg-[#06257f] hover:bg-[#00175b] disabled:cursor-not-allowed disabled:bg-[#020e32] disabled:text-white"
            >
              {t('Add')}
            </Button>
          </Popover.Dropdown>
        </Popover>
      </nav>
    </header>
  );
};
export default SearchBar;
