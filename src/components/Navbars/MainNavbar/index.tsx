import styles from './MainNavbar.module.css';
import LanguageSelect from '@/components/LanguageSelect';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const MainNavbar = () => (
  <header className={styles.header}>
    <nav>
      <ul className={styles.list}>
        <li>/home</li>

        <li>/test</li>
        <li>/dynamic</li>
      </ul>
    </nav>
    <nav>
      <ul className={styles.list}>
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

export default MainNavbar;
