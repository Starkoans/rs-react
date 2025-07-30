import { fetchCatById } from '@/api/fetch-cat-by-id';
import { URL_SEARCH_PARAMS } from '@/sources/constants';
import { messages } from '@/sources/messages';
import type { Cat } from '@/sources/types/cat';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './cat-detail.module.css';
import { fetchCatImage } from '@/api/fetch-cat-image';

export const CatDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catId = searchParams.get(URL_SEARCH_PARAMS.cat);
  const [isVisible, setIsVisible] = useState(false);
  const [cat, setCat] = useState<Cat.Breed>();
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCat = async () => {
      try {
        if (!catId) return;
        setIsLoading(true);
        setError(null);

        const catInfo = await fetchCatById(catId);
        const imgInfo = await fetchCatImage(catInfo.reference_image_id);

        setCat(catInfo);
        setImgUrl(imgInfo.url);
      } catch (error) {
        const err =
          error instanceof Error ? error.message : messages.errors.default;
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCat();
  }, [catId]);

  useEffect(() => {
    setIsVisible(catId ? true : false);
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
  if (error) return <div>{error}</div>;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.drawer} ${isVisible ? styles.drawerVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          {messages.buttons.close}
        </button>
        {isLoading ? (
          <h3>{messages.paragraphs.loading}</h3>
        ) : (
          <>
            <div className={styles.imageWrapper}>
              {imgUrl && (
                <img src={imgUrl} alt={cat?.name} className={styles.image} />
              )}
            </div>
            <h3>{cat?.name}</h3>
            <p className={styles.temperament}>{cat?.temperament}</p>
            <p>{cat?.description}</p>
            <p>
              {messages.paragraphs.breedFrom}
              <b>{cat?.origin}</b>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
