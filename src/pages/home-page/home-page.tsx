import styles from './home-page.module.css';
import { CatsList } from '@components/cat-list/cats-list';
import { Search } from '@components/search/search';
import { useEffect, useState } from 'react';
import { PaginationControls } from '@/components/pagination/pagination';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PAGINATION_START_PAGE, URL_SEARCH_PARAMS } from '@/sources/constants';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useLazyGetAllCatsByBreedQuery } from '@/api';
import { getErrorMessage } from '@/utils/get-error-message';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getSearchInput, saveSearchInputToLS } = useLocalStorage();
  const [searchValue, setSearchValue] = useState(getSearchInput());

  const [getCatsBreeds, { currentData: cats, isFetching, error }] =
    useLazyGetAllCatsByBreedQuery();

  const handleSearchButton = async () => {
    await getCatsBreeds({
      breed: searchValue,
      page: PAGINATION_START_PAGE,
    });
  };

  const goToPage = async (page: number) => {
    await getCatsBreeds({
      breed: searchValue,
      page,
    });
  };

  useEffect(() => {
    if (!cats?.pagination.page) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH_PARAMS.page, cats.pagination.page.toString());
    setSearchParams(newParams);
  }, [cats?.pagination.page]);

  useEffect(() => {
    const pageInParams = Number(searchParams.get(URL_SEARCH_PARAMS.page));
    goToPage(pageInParams || PAGINATION_START_PAGE);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    saveSearchInputToLS(e.target.value);
  };

  return (
    <>
      <Search
        handleSearchButton={handleSearchButton}
        searchValue={searchValue}
        handleInputChange={handleInputChange}
      />
      <div className={styles.container}>
        <CatsList
          cats={cats?.data}
          isLoading={isFetching}
          error={error && getErrorMessage(error)}
        />
        <Outlet />
      </div>
      <PaginationControls pagination={cats?.pagination} goToPage={goToPage} />
    </>
  );
};
