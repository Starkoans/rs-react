import { fetchCatById } from '@/api/fetch-cat-by-id';
import { URL_SEARCH_PARAMS } from '@/sources/constants';
import { messages } from '@/sources/messages';
import type { Cat } from '@/sources/types/cat';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './cat-detail.module.css';

interface CatDetailProps {
  catId: string;
}

export const CatDetail: React.FC<CatDetailProps> = ({ catId }) => {
  const [cat, setCat] = useState<Cat.Breed>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCat = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchCatById(catId);
        setCat(res);
      } catch (error) {
        const err =
          error instanceof Error ? error.message : messages.errors.default;
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (catId) getCat();
  }, [catId]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

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
  if (!cat) return <div>{messages.noCatsFound}</div>;
  return (
    <div
      className={`${styles.drawer} ${isVisible ? styles.drawerVisible : ''}`}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button onClick={onClose}>close</button>
          <p>{cat.id}</p>
          <p>{cat.name}</p>
        </>
      )}
    </div>
  );
};
