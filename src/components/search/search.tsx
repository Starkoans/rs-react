import styles from './Search.module.css';
import React, { useEffect } from 'react';
import { messages } from '../../sources/messages';
import { usePersistedSearchInput } from '@/hooks/use-persistent-search-input';

interface SearchProps {
  getCatsByBreed: (searchInput: string) => Promise<void>;
}

export const Search: React.FC<SearchProps> = ({ getCatsByBreed }) => {
  const { searchInput, setSearchInput } = usePersistedSearchInput();

  useEffect(() => {
    getCatsByBreed(searchInput);
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
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
