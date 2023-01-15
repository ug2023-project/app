// import ThemeSwitcher from '@/components/ThemeSwitcher';
// import LanguageSelect from '@/components/LanguageSelect';
import { Popover, Button, TextInput } from '@mantine/core';

import styles from './SearchBar.module.css';
import AutocompleteCollection from '../AutocompleteCollection';
import { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';

const handleDefaultValue = async () => {
  const clipboard = await navigator.clipboard.readText();
  const isUrl = clipboard.startsWith('http');
  return isUrl ? clipboard : '';
};

const SearchBar = () => {
  const [value, setValue] = useState('');

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
      {/*<nav>*/}
      {/*  <ul className={styles.settingsList}>*/}
      {/*    <li>*/}
      {/*      <LanguageSelect />*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <ThemeSwitcher />*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</nav>*/}
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
            />
          </Popover.Dropdown>
        </Popover>
      </nav>
    </header>
  );
};
export default SearchBar;
