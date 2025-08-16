'use client';
import styles from './home-page.module.css';
import { URL_SEARCH_PARAMS } from '@app/lib/constants';
import { selectSearchValue } from '@app/lib/store/search-cats';
import { getErrorMessage } from '@app/lib/utils/get-error-message';
import { CatDetail } from '@components/cat-detail/cat-detail';
import { CatsList } from '@components/cat-list/cats-list';
import { PaginationControls } from '@components/pagination/pagination';
import { useGetAllCatsByBreedQuery } from 'api/cats.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export function CatsListPaginated() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const searchValue = useSelector(selectSearchValue);
  const pageInParams = Number(searchParams.get(URL_SEARCH_PARAMS.page));

  const {
    currentData: cats,
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

  return (
    <>
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
