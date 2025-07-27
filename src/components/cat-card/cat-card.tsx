import React, { useEffect, useState } from 'react';
import type { Cat } from '../../sources/types/cat';
import styles from './cat-card.module.css';
import { fetchCatImage } from '../../api/fetch-cat-image';
import { useSearchParams } from 'react-router-dom';
import { URL_SEARCH_PARAMS } from '@/sources/constants';

interface Props {
  cat: Cat.Breed;
}

export const CatCard: React.FC<Props> = ({ cat }) => {
  const [catImg, setCatImg] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const img = await fetchCatImage(cat.reference_image_id);
      setCatImg(img.url);
    };

    init();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH_PARAMS.cat, cat.id);
    setSearchParams(newParams);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        {catImg && <img src={catImg} alt={cat.name} className={styles.image} />}
      </div>

      <h2>{cat.name}</h2>
      <p className={styles.description}>{cat.description}</p>
    </div>
  );
};
