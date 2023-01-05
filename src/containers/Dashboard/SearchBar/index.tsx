import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSelect from '@/components/LanguageSelect';

import styles from './SearchBar.module.css';
import AutocompleteCollection from '../AutocompleteCollection';

const SearchBar = () => (
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
  </header>
);

export default SearchBar;
