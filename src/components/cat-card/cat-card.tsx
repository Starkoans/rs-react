'use client';

import { useState, type FC } from 'react';
import type { Cat } from '../../app/lib/types/cat';
import styles from './cat-card.module.css';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CatIcon } from '../../assets/cat-icon';
import { StatusBar } from '../status-bar/status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import cn from 'classnames';
import { useGetCatImgQuery } from 'api/cats.service';
import {
  addCat,
  removeCat,
  selectIsCatInDownloadList,
} from '@app/lib/store/download-list';
import { URL_SEARCH_PARAMS } from '@app/lib/constants';
import { messages } from '@app/lib/messages';
import Image from 'next/image';

interface Props {
  cat: Cat.Breed;
}

export const CatCard: FC<Props> = ({ cat }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isSelected = useSelector(selectIsCatInDownloadList(cat.id));
  const [loadedImg, setLoadedImg] = useState(false);

  const { currentData: catImg } = useGetCatImgQuery(
    cat.reference_image_id ?? skipToken
  );

  const onCardClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_SEARCH_PARAMS.cat, cat.id);
    replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const onCheck = () => {
    dispatch(isSelected ? removeCat(cat) : addCat(cat));
  };

  return (
    <div className={styles.card} onClick={onCardClick}>
      <div className={styles.imageWrapper}>
        {!catImg?.url ? (
          <CatIcon />
        ) : (
          <Image
            height={155}
            width={300}
            src={catImg.url}
            alt={cat.name}
            className={cn(styles.image, { [styles.visible]: loadedImg })}
            onLoad={() => setLoadedImg(true)}
          />
        )}
      </div>
      <div className={styles.info}>
        <h2 className={styles.heading}>{cat.name}</h2>
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
