import styles from './cat-list.module.css';
import { messages } from '../../app/lib/messages';
import { CatCardServer } from '../cat-card/cat-card.server';
import type React from 'react';
import type { Cat } from '@app/lib/types/cat';

interface CatsListProps {
  cats?: Cat.Breed[];
  error?: string;
}

export const CatsList: React.FC<CatsListProps> = ({ cats, error }) => {
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
          <CatCardServer cat={cat} />
        </li>
      ))}
    </ul>
  );
};
