import { Popover, Button, TextInput } from '@mantine/core';
import styles from './SearchBar.module.css';
import AutocompleteCollection from '../AutocompleteCollection';
import { useEffect } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import useTypedDispatch from '@/hooks/useTypedDispatch';
import { useParams } from 'react-router-dom';
import { useValidatedState } from '@mantine/hooks';
import createBookmark from '../ducks/bookmarks/actions/createBookmark';

const handleDefaultValue = async () => {
  const clipboard = await navigator.clipboard.readText();
  const isUrl = clipboard.startsWith('http');
  return isUrl ? clipboard : '';
};

const SearchBar = () => {
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

  const dispatch = useTypedDispatch();

  const { collectionId } = useParams();

  const createBookmarkHandler = (url: string) => {
    if (collectionId === undefined) {
      return;
    }
    dispatch(createBookmark({ collectionId, bookmark: { link: url } }));
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
        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button variant="outline" leftIcon={<BsFillStarFill />}>
              Add
            </Button>
          </Popover.Target>
          <Popover.Dropdown
            sx={(theme) => ({
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
            <TextInput
              label="URL"
              placeholder="https://"
              size="xs"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              error={!valid && 'Invalid URL'}
            />
            <Button
              variant="outline"
              color="blue"
              onClick={() => createBookmarkHandler(value)}
              disabled={!valid || value === ''}
            >
              Add
            </Button>
          </Popover.Dropdown>
        </Popover>
      </nav>
    </header>
  );
};
export default SearchBar;
