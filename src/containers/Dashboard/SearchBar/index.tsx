import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSelect from '@/components/LanguageSelect';
import { Popover, Button, TextInput } from '@mantine/core';

import styles from './SearchBar.module.css';
import AutocompleteCollection from '../AutocompleteCollection';
import { useEffect, useState } from 'react';

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
      <nav>
        <ul className={styles.settingsList}>
          <li>
            <LanguageSelect />
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
      <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Button>✪ Add</Button>
        </Popover.Target>
        <Popover.Dropdown
          sx={(theme) => ({
            background:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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
    </header>
  );
};
export default SearchBar;
