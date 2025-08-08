import styles from './home-page.module.css';
import { CatsList } from '@components/cat-list/cats-list';
import { Search } from '@components/search/search';
import { PaginationControls } from '@/components/pagination/pagination';
import {
  PAGINATION_DEFAULT_PAGE,
  URL_SEARCH_PARAMS,
} from '@/sources/constants';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useGetAllCatsByBreedQuery } from '@/api/cats.service';
import { getErrorMessage } from '@/utils/get-error-message';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchValue, setSearchValue } from '@/store/search-cats';

export const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = useSelector(selectSearchValue);
  const pageInParams = Number(searchParams.get(URL_SEARCH_PARAMS.page));

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
    setSearchParams((prev) => ({ ...prev, page }));
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
        <Outlet />
      </div>
      <PaginationControls pagination={cats?.pagination} goToPage={goToPage} />
    </>
  );
};
