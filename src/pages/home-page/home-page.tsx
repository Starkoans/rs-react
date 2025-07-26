import styles from './home-page.module.css';
import { CatsList } from '@components/cat-list/cats-list';
import { Search } from '@components/search/search';
import { useEffect, useState } from 'react';
import { messages } from '@/sources/messages';
import { fetchCatsBreeds } from '@/api/fetch-cats-breed';
import { PaginationControls } from '@/components/pagination/pagination';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Cat } from '@/sources/types/cat';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_START_PAGE,
} from '@/sources/constants';
import type { Pagination } from '@/sources/types/pagination';

export const HomePage = () => {
  const { getSearchInput, saveSearchInputToLS } = useLocalStorage();
  const [searchValue, setSearchValue] = useState<string>(getSearchInput());

  const [cats, setCats] = useState<Cat.Breed[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    limit: PAGINATION_DEFAULT_LIMIT,
    page: PAGINATION_START_PAGE,
    totalItems: 0,
    totalPages: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCatsByBreed = async (
    breed: string,
    page: number = PAGINATION_START_PAGE,
    limit: number = PAGINATION_DEFAULT_LIMIT
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchCatsBreeds(breed, page, limit);
      setCats(res.data);
      setPagination(res.pagination);
    } catch (error) {
      const err =
        error instanceof Error ? error.message : messages.errors.default;
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
    getCatsByBreed(searchValue, page, pagination.limit);
  };

  const handlePrev = () => {
    if (pagination.page > PAGINATION_START_PAGE) {
      goToPage(pagination.page - 1);
    }
  };
  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      goToPage(pagination.page + 1);
    }
  };

  useEffect(() => {
    getCatsByBreed(searchValue);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    saveSearchInputToLS(e.target.value);
  };

  return (
    <>
      <Search
        onSearch={getCatsByBreed}
        searchValue={searchValue}
        handleInputChange={handleInputChange}
      />
      <PaginationControls
        pagination={pagination}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <div className={styles.container}>
        <CatsList cats={cats} isLoading={isLoading} error={error} />
      </div>
    </>
  );
};
