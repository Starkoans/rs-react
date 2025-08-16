'use client';

import styles from './Search.module.css';

import { type FC, useEffect, useState } from 'react';
import { messages } from '../../app/lib/messages';
import { EnterIcon } from '@assets/enter-icon';

interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
  onRefresh?: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ onSearch, onRefresh, value }) => {
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
        placeholder={messages.input.search}
        value={searchValue}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        className={styles.button}
        aria-label={messages.buttons.search}
      >
        <EnterIcon />
      </button>
      {onRefresh && (
        <button onClick={handleRefreshButtonClick}>
          {messages.buttons.refresh}
        </button>
      )}
    </form>
  );
};
