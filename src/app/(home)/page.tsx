'use client';

import styles from './home-page.module.css';
import { CatsList } from '@components/cat-list/cats-list';
import { Search } from '@components/search/search';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  LSKeys,
  PAGINATION_DEFAULT_PAGE,
  URL_SEARCH_PARAMS,
} from '../lib/constants';
import { selectSearchValue, setSearchValue } from '@app/lib/store/search-cats';
import { useGetAllCatsByBreedQuery } from 'api/cats.service';
import { getErrorMessage } from '../lib/utils/get-error-message';
import { useEffect } from 'react';
import { PaginationControls } from '@components/pagination/pagination';
import { CatDetail } from '@components/cat-detail/cat-detail';

export default function HomePage({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const searchValue = useSelector(selectSearchValue);
  const pageInParams = Number(searchParams.get(URL_SEARCH_PARAMS.page));

  useEffect(() => {
    const searchValue = localStorage.getItem(LSKeys.searchValue) || '';
    dispatch(setSearchValue(searchValue));
  }, []);

  const {
    currentData: cats,
    refetch,
    isFetching,
    error,
  } = useGetAllCatsByBreedQuery({
    breed: searchValue,
    page: pageInParams,
  });

  const goToPage = async (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH_PARAMS.page, page.toString());
    replace(`${pathname}?${newParams.toString()}`);
  };

  const onSearch = (value: string) => {
    dispatch(setSearchValue(value));
    goToPage(PAGINATION_DEFAULT_PAGE);
  };

  return (
    <>
      <Search
        onSearch={onSearch}
        onRefresh={refetch}
        initialValue={searchValue}
      />
      <div className={styles.container}>
        <CatsList
          cats={cats?.data}
          isLoading={isFetching}
          error={error && getErrorMessage(error)}
        />
        <CatDetail />
      </div>
      <PaginationControls pagination={cats?.pagination} goToPage={goToPage} />
    </>
  );
}
