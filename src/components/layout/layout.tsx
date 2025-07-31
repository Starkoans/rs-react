import { messages } from '@sources/messages';
import { Link, Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import { ROUTES } from '@/router';
import { Flyout } from '@/components/flyout/flyout';
import { useTheme } from '@/theme/theme-context';
import { MoonIcon } from '@/assets/moon-icon';
import { SunIcon } from '@/assets/sun-icon';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to={ROUTES.home}>
            <h1 className={styles.headerTitle}>{messages.headers.appName}</h1>
          </Link>
          <Link to={ROUTES.about}>{messages.links.about}</Link>
        </nav>
        <button onClick={toggleTheme} className={styles.toggleThemeBtn}>
          {theme === 'dark' ? (
            <MoonIcon height="20px" width="20px" />
          ) : (
            <SunIcon height="20px" width="20px" />
          )}
        </button>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Flyout />
    </>
  );
};
