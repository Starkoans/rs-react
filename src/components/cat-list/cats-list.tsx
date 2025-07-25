import styles from './cat-list.module.css';
import { messages } from '../../sources/messages';
import { Spinner } from '../spinner/spinner';
import { CatCard } from '../cat-card/cat-card';
import type { Cat } from '@sources/types/cat';
import type React from 'react';

interface CatsListProps {
  cats: Cat[];
  error: string | null;
  isLoading: boolean;
}

export const CatsList: React.FC<CatsListProps> = ({
  cats,
  error,
  isLoading,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <>
        <p className="error">{messages.errors.oops}</p>
        <p className="error">{error || messages.errors.default}</p>
      </>
    );
  }

  if (cats.length === 0) {
    return <p>{messages.noCatsFound}</p>;
  }

  return (
    <ul className={styles.catsList}>
      {cats.map((cat, index) => (
        <li key={index} className={styles.listItem}>
          <CatCard cat={cat} />
        </li>
      ))}
    </ul>
  );
};
