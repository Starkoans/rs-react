import { LSKeys } from '@/sources/ls-keys';

export const useLocalStorage = () => {
  const getSearchInput = () => {
    return localStorage.getItem(LSKeys.SearchInput) ?? '';
  };

  const saveSearchInput = (value: string) => {
    localStorage.setItem(LSKeys.SearchInput, value);
  };

  return { getSearchInput, saveSearchInput };
};
