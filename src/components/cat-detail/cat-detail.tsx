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
    setIsVisible(!!catId);
  }, [catId]);

  const onClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(URL_SEARCH_PARAMS.cat);
      setSearchParams(newParams);
    }, 300);
  };

  if (!catId) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.drawer} ${isVisible ? styles.drawerVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          {messages.buttons.close}
        </button>
        {isFetching && (
          <>
            <div className={styles.spinnerContainer}>
              <Spinner />
              <span>{messages.paragraphs.loading}</span>
            </div>
          </>
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
                <img src={catImg.url} alt={cat.name} className={styles.image} />
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
