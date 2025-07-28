import { messages } from '@sources/messages';
import { Link, Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import { ROUTES } from '@/router';
import { Flyout } from '@/components/flyout/flyout';

export const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to={ROUTES.home}>
            <h1 className={styles.headerTitle}>{messages.headers.appName}</h1>
          </Link>
          <Link to={ROUTES.about}>{messages.links.about}</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>

      <Flyout />
    </>
  );
};
