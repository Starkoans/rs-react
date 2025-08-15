import styles from './cat-list.module.css';
import { messages } from '../../app/lib/messages';
import { Spinner } from '../spinner/spinner';
import { CatCard } from '../cat-card/cat-card';
import type React from 'react';
import type { Cat } from '@app/lib/types/cat';

interface CatsListProps {
  cats?: Cat.Breed[];
  error?: string;
  isLoading?: boolean;
}

export const CatsList: React.FC<CatsListProps> = ({
  cats,
  error,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <p className="error">{messages.errors.oops}</p>
        <p className="error">{error}</p>
      </>
    );
  }

  if (cats?.length === 0) {
    return <p>{messages.noCatsFound}</p>;
  }

  return (
    <ul className={styles.catsList}>
      {cats?.map((cat, index) => (
        <li key={index} className={styles.listItem}>
          <CatCard cat={cat} />
        </li>
      ))}
    </ul>
  );
};
