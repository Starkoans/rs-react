import { type FC } from 'react';
import type { Cat } from '../../sources/types/cat';
import styles from './cat-card.module.css';
import { useSearchParams } from 'react-router-dom';
import { URL_SEARCH_PARAMS } from '@/sources/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { addCat, removeCat } from '@/store/selected-cats.slice';
import { messages } from '@/sources/messages';
import { CatIcon } from '../../assets/cat-icon';
import { StatusBar } from '../status-bat/status-bar';
import { selectIsCatSelected } from '@/store/selected-cats.selectors';
import { useGetCatImgQuery } from '@/api';

interface Props {
  cat: Cat.Breed;
}

export const CatCard: FC<Props> = ({ cat }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSelected = useAppSelector(selectIsCatSelected(cat.id));

  const { currentData: catImg } = useGetCatImgQuery(
    cat.reference_image_id || '',
    { skip: !cat.reference_image_id }
  );

  const onCardClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH_PARAMS.cat, cat.id);
    setSearchParams(newParams);
  };

  const onCheck = () => {
    dispatch(isSelected ? removeCat(cat) : addCat(cat));
  };

  return (
    <div className={styles.card} onClick={onCardClick}>
      <div className={styles.imageWrapper}>
        {!catImg && <CatIcon />}
        {catImg && (
          <img src={catImg.url} alt={cat.name} className={styles.image} />
        )}
      </div>
      <div className={styles.info}>
        <h2>{cat.name}</h2>
        <div className={styles.statuses}>
          <span>{messages.paragraphs.affection}</span>
          <StatusBar value={cat.affection_level} />

          {messages.paragraphs.energy}
          <StatusBar value={cat.energy_level} />

          {messages.paragraphs.intelligence}
          <StatusBar value={cat.intelligence} />

          {messages.paragraphs.adaptability}
          <StatusBar value={cat.adaptability} />

          {messages.paragraphs.sociality}
          <StatusBar value={cat.social_needs} />

          {messages.paragraphs.vocalisation}
          <StatusBar value={cat.vocalisation} />
        </div>
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
