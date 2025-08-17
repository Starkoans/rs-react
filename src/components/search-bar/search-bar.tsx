'use client';

import { revalidateCats } from '@app/actions/revalidate-cats';
import {
  LSKeys,
  PAGINATION_DEFAULT_PAGE,
  URL_SEARCH_PARAMS,
} from '@app/lib/constants';
import { Search } from '@components/search/search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get(URL_SEARCH_PARAMS.query) || '';

  useEffect(() => {
    const saved = localStorage.getItem(LSKeys.searchValue) || '';
    if (saved !== searchValue) search(saved);
  }, []);

  const refetch = async () => {
    await revalidateCats();
    router.replace(`${pathname}/?${searchParams.toString()}`);
  };

  const search = (value: string) => {
    const trimmed = value.trim();
    const newParams = new URLSearchParams(searchParams);

    newParams.set(URL_SEARCH_PARAMS.query, trimmed);
    localStorage.setItem(LSKeys.searchValue, trimmed);

    if (!trimmed) {
      newParams.delete(URL_SEARCH_PARAMS.query);
    }

    newParams.set(URL_SEARCH_PARAMS.page, PAGINATION_DEFAULT_PAGE.toString());
    router.push(`?${newParams.toString()}`);
  };

  return <Search onSearch={search} onRefresh={refetch} value={searchValue} />;
}
