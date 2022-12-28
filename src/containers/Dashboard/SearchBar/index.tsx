import styles from './SearchBar.module.css';
import LanguageSelect from '@/components/LanguageSelect';

const SearchBar = () => (
  <header className={styles.searchBar}>
    <nav></nav>
    <nav>
      <ul>
        <li>
          <LanguageSelect />
        </li>
      </ul>
    </nav>
  </header>
);

export default SearchBar;
