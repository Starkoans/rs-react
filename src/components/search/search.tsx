import styles from './Search.module.css';

import React from 'react';
import { messages } from '../../sources/messages';
import { EnterIcon } from '@/assets/enter-icon';

interface SearchProps {
  searchValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (searchInput: string) => Promise<void>;
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  searchValue,
  handleInputChange,
}) => {
  const handleSearchButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await onSearch(searchValue);
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
    </form>
  );
};
