import { LSKeys } from '@/sources/ls-keys';
import { useState } from 'react';

export const usePersistedSearchInput = () => {
  const stored = localStorage.getItem(LSKeys.SearchInput) ?? '';
  const [searchInput, setSearchInput] = useState(stored);

  const saveSearchInput = (value: string) => {
    setSearchInput(value);
    localStorage.setItem(LSKeys.SearchInput, value);
  };

  return { searchInput, setSearchInput: saveSearchInput };
};
