import styles from './home-page.module.css';
import { CatsList } from '@components/cat-list/cats-list';
import { Search } from '@components/search/search';
import { useCatsSearch } from '@hooks/use-cats-search';

export const HomePage = () => {
  const catsSearch = useCatsSearch();
  return (
    <>
      <Search {...catsSearch} />
      <div className={styles.container}>
        <CatsList {...catsSearch} />
      </div>
    </>
  );
};
