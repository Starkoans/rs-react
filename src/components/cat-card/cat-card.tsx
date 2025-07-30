import React, { useEffect, useState } from 'react';
import type { Cat } from '../../sources/types/cat';
import styles from './cat-card.module.css';
import { fetchCatImage } from '../../api/fetch-cat-image';
import { useSearchParams } from 'react-router-dom';
import { URL_SEARCH_PARAMS } from '@/sources/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { addCat, removeCat } from '@/download-list.slice';
import { messages } from '@/sources/messages';

interface Props {
  cat: Cat.Breed;
}

export const CatCard: React.FC<Props> = ({ cat }) => {
  const [catImg, setCatImg] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCats = useAppSelector(
    (state) => state.downloadList.selectedCats
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const img = await fetchCatImage(cat.reference_image_id);
      setCatImg(img.url);
    };

    init();
  }, []);

  const onClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH_PARAMS.cat, cat.id);
    setSearchParams(newParams);
  };

  const isSelected = selectedCats.some(
    (selectedCat) => cat.id === selectedCat.id
  );

  const onCheck = () => {
    if (isSelected) {
      dispatch(removeCat(cat));
    } else {
      dispatch(addCat(cat));
    }
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        {catImg && <img src={catImg} alt={cat.name} className={styles.image} />}
      </div>
      <div className={styles.info}>
        <h2>{cat.name}</h2>
        <p className={styles.description}>{cat.description}</p>
      </div>
      <div className={styles.check}>
        <input
          type="checkbox"
          id={`is-selected-${cat.id}`}
          checked={isSelected}
          onClick={(e) => e.stopPropagation()}
          onChange={onCheck}
        />
        <label
          htmlFor={`is-selected-${cat.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {messages.input.addToDownloadList}
        </label>
      </div>
    </div>
  );
};
