import { fetchCats } from '@api/fetch-cats-breed';
import { messages } from '@sources/messages';
import type { Cat } from '@sources/types/cat';
import { useState } from 'react';

export const useCatsSearch = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCatsByBreed = async (searchInput: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const cats = await fetchCats(searchInput);
      setCats(cats);
    } catch (error) {
      const err =
        error instanceof Error ? error.message : messages.errors.default;
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getCatsByBreed, cats, isLoading, error };
};
