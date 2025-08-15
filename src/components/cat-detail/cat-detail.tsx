'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './cat-detail.module.css';
import { Spinner } from '../spinner/spinner';
import { skipToken } from '@reduxjs/toolkit/query';
import cn from 'classnames';
import { URL_SEARCH_PARAMS } from '../../app/lib/constants';
import { useGetCatByIdQuery, useGetCatImgQuery } from '../../api/cats.service';
import { messages } from '../../app/lib/messages';
import { getErrorMessage } from '../../app/lib/utils/get-error-message';
import { CatIcon } from '../../assets/cat-icon';

export const CatDetail = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const catId = searchParams.get(URL_SEARCH_PARAMS.cat);
  const [isVisible, setIsVisible] = useState(false);

  const {
    currentData: cat,
    isFetching,
    error,
  } = useGetCatByIdQuery(catId ?? skipToken);

  const { currentData: catImg } = useGetCatImgQuery(
    cat?.reference_image_id ?? skipToken
  );

  useEffect(() => {
    if (catId) {
      setIsVisible(false);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [catId]);

  const onClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(URL_SEARCH_PARAMS.cat);
      replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, 500);
  };

  if (catId)
    return (
      <div
        className={cn(styles.backdrop, {
          [styles.visible]: isVisible,
          [styles.hidden]: !isVisible,
        })}
        onClick={onClose}
      >
        <div
          className={cn(styles.drawer, {
            [styles.visible]: isVisible,
            [styles.hidden]: !isVisible,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            {messages.buttons.close}
          </button>
          {isFetching && (
            <div className={styles.spinnerContainer}>
              <Spinner />
              <span>{messages.paragraphs.loading}</span>
            </div>
          )}
          {error && (
            <>
              <h3 className={styles.textSection}>{messages.errors.oops}</h3>
              <p>{getErrorMessage(error)}</p>
            </>
          )}
          {cat && !isFetching && !error && (
            <>
              <div className={styles.imageWrapper}>
                <CatIcon />
                {catImg?.url && (
                  <img
                    src={catImg.url}
                    alt={cat.name}
                    className={styles.image}
                  />
                )}
              </div>
              <h3 className={styles.textSection}>{cat.name}</h3>
              <p className={cn(styles.temperament, styles.textSection)}>
                {cat.temperament}
              </p>
              <p className={styles.textSection}>{cat.description}</p>
              <p className={styles.textSection}>
                {messages.paragraphs.breedFrom}
                <b>{cat.origin}</b>
              </p>
            </>
          )}
        </div>
      </div>
    );
};
