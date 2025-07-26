import { LSKeys } from '@/sources/constants';

export const useLocalStorage = () => {
  const getSearchInput = () => {
    return localStorage.getItem(LSKeys.SearchInput) ?? '';
  };

  const saveSearchInputToLS = (value: string) => {
    localStorage.setItem(LSKeys.SearchInput, value);
  };

  return { getSearchInput, saveSearchInputToLS };
};
