import styles from './page.module.css';
import { URL_SEARCH_PARAMS } from '@app/lib/constants';
import { CatsList } from '@components/cat-list/cats-list';
import { PaginationControls } from '@components/pagination/pagination';
import { fetchCatsByBreed } from '@app/actions/fetch-cats-by-breed';

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}
export default async function Catalog({ searchParams }: Props) {
  const {
    [URL_SEARCH_PARAMS.query]: rawSearchValue,
    [URL_SEARCH_PARAMS.page]: pageInParams,
  } = searchParams;

  const searchValue =
    typeof rawSearchValue === 'string'
      ? rawSearchValue
      : Array.isArray(rawSearchValue)
        ? rawSearchValue.join(', ')
        : '';

  const page =
    typeof pageInParams === 'string'
      ? pageInParams
      : Array.isArray(pageInParams)
        ? pageInParams[0]
        : undefined;
  const cats = await fetchCatsByBreed(searchValue, page);

  return (
    <>
      <div className={styles.container}>
        <CatsList cats={cats?.data} />
      </div>
      <PaginationControls pagination={cats?.pagination} />
    </>
  );
}
