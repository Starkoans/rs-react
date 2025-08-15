'use client';

import Link from 'next/link';
import styles from './layout.module.css';
import { ROUTES } from '@app/lib/constants';
import { messages } from '@app/lib/messages';
import { MoonIcon } from '@assets/moon-icon';
import { SunIcon } from '@assets/sun-icon';
import { Flyout } from '@components/flyout/flyout';
import { useTheme } from '@app/lib/theme/use-theme';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href={ROUTES.home}>
            <h1 className={styles.headerTitle}>{messages.headers.appName}</h1>
          </Link>
          <Link href={ROUTES.about}>{messages.links.about}</Link>
        </nav>
        <button
          onClick={toggleTheme}
          className={styles.toggleThemeBtn}
          aria-label={messages.buttons.toggleTheme}
        >
          {theme === 'dark' ? (
            <MoonIcon height="20px" width="20px" />
          ) : (
            <SunIcon height="20px" width="20px" />
          )}
        </button>
      </header>
      <main className={styles.main}>{children}</main>
      <Flyout />
    </>
  );
};
