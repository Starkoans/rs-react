import { fetchCats } from '@api/fetch-cats-breed';
import { CatsList } from '@components/cat-list/cats-list';
import { Header } from '@components/header/header';
import { Search } from '@components/search/search';
import { SimulateError } from '@components/simulate-error';
import type { Cat } from '@sources/types/cat';
import { messages } from '@sources/messages';
import { LSKeys } from '@sources/ls-keys';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const savedInput = localStorage.getItem(LSKeys.SearchInput);
      setSearchInput(savedInput || '');
      await getCats(savedInput || '');
    };

    void init();
  }, []);

  const handleSearch = async (searchInput: string) => {
    await getCats(searchInput);
  };

  const getCats = async (searchInput: string) => {
    setLoading(true);
    setError(null);
    try {
      const cats = await fetchCats(searchInput);
      setCats(cats);
    } catch (error) {
      const err =
        error instanceof Error ? error.message : messages.errors.default;
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header>
        <Search onSearch={handleSearch} value={searchInput} />
        <SimulateError />
      </Header>
      <CatsList cats={cats} isLoading={loading} error={error} />
    </>
  );
};
