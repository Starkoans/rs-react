'use client';

import {
  LSKeys,
  PAGINATION_DEFAULT_PAGE,
  URL_SEARCH_PARAMS,
} from '@app/lib/constants';
import { selectSearchValue, setSearchValue } from '@app/lib/store/search-cats';
import { Search } from '@components/search/search';
import { useGetAllCatsByBreedQuery } from 'api/cats.service';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function SearchBar() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  const { refetch } = useGetAllCatsByBreedQuery({ breed: searchValue });

  useEffect(() => {
    const saved = localStorage.getItem(LSKeys.searchValue) || '';
    dispatch(setSearchValue(saved));
  }, []);

  const onSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    const trimmed = value.trim();
    dispatch(setSearchValue(trimmed));
    newParams.set(URL_SEARCH_PARAMS.query, trimmed);
    localStorage.setItem(LSKeys.searchValue, trimmed);

    if (!trimmed) {
      newParams.delete(URL_SEARCH_PARAMS.query);
    }

    newParams.set(URL_SEARCH_PARAMS.page, PAGINATION_DEFAULT_PAGE.toString());
    replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Suspense>
      <Search onSearch={onSearch} onRefresh={refetch} value={searchValue} />
    </Suspense>
  );
}
