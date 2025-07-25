import styles from './Search.module.css';
import React, { useEffect, useState } from 'react';
import { messages } from '../../sources/messages';
import { LSKeys } from '../../sources/ls-keys';

interface SearchProps {
  getCatsByBreed: (searchInput: string) => Promise<void>;
}

export const Search: React.FC<SearchProps> = ({ getCatsByBreed }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const savedInput = localStorage.getItem(LSKeys.SearchInput);
      setSearchInput(savedInput || '');
      await getCatsByBreed(savedInput || '');
    };

    void init();
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
    localStorage.setItem(LSKeys.SearchInput, event.target.value);
  };

  const handleSearchButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await getCatsByBreed(searchInput);
  };

  return (
    <form className={styles.container}>
      <input
        className={styles.input}
        placeholder={messages.input.search}
        value={searchInput}
        onChange={handleInputChange}
      />
      <button className={styles.button} onClick={handleSearchButtonClick}>
        {messages.buttons.search}
      </button>
    </form>
  );
};
