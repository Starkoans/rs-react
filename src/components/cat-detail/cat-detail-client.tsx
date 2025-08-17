'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './cat-detail.module.css';
import cn from 'classnames';
import { URL_SEARCH_PARAMS } from '../../app/lib/constants';
import { messages } from '../../app/lib/messages';
import { CatIcon } from '../../assets/cat-icon';
import Image from 'next/image';
import { Drawer } from './drawer';
import type { Cat } from '@app/lib/types/cat';

interface Props {
  cat: Cat.Breed;
  imgUrl: string | null;
  error?: string;
}

export const CatDetailClient = ({ cat, imgUrl, error }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const catId = searchParams.get(URL_SEARCH_PARAMS.cat);

  const onClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(URL_SEARCH_PARAMS.cat);
    replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Drawer isOpen={!!catId} onClose={onClose}>
      {error && <p>{messages.errors.oops}</p>}
      <div className={styles.imageWrapper}>
        {!imgUrl && <CatIcon />}
        {imgUrl && (
          <Image
            height={200}
            width={340}
            src={imgUrl}
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
    </Drawer>
  );
};
