'use client';

import styles from './Search.module.css';
import { type FC, useEffect, useState } from 'react';
import { EnterIcon } from '@assets/enter-icon';
import { useTranslations } from 'next-intl';

interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
  onRefresh?: (value?: string) => void;
}

export const Search: FC<SearchProps> = ({ onSearch, onRefresh, value }) => {
  const t = useTranslations('Search');
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleRefreshButtonClick = () => {
    if (onRefresh) onRefresh(searchValue);
  };

  return (
    <form className={styles.container} onSubmit={handleSearchButtonClick}>
      <input
        name="search"
        className={styles.input}
        placeholder={t('placeholder')}
        value={searchValue}
        onChange={handleInputChange}
      />

      <button type="submit" className={styles.button} aria-label={t('search')}>
        <EnterIcon />
      </button>
      {onRefresh && (
        <button onClick={handleRefreshButtonClick}>{t('refresh')}</button>
      )}
    </form>
  );
};
