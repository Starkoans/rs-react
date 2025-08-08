import { URL_SEARCH_PARAMS } from '@/sources/constants';
import { messages } from '@/sources/messages';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './cat-detail.module.css';
import { CatIcon } from '@/assets/cat-icon';
import { Spinner } from '../spinner/spinner';
import { useGetCatByIdQuery, useGetCatImgQuery } from '@/api/cats.service';
import { getErrorMessage } from '@/utils/get-error-message';
import { skipToken } from '@reduxjs/toolkit/query';
import cn from 'classnames';

export const CatDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
      setSearchParams(newParams);
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
              <h3 className="error">{messages.errors.oops}</h3>
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
              <h3>{cat.name}</h3>
              <p className={styles.temperament}>{cat.temperament}</p>
              <p>{cat.description}</p>
              <p>
                {messages.paragraphs.breedFrom}
                <b>{cat.origin}</b>
              </p>
            </>
          )}
        </div>
      </div>
    );
};
