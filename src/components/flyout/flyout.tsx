import { removeAllCats } from '@/store/selected-cats.slice';
import { messages } from '@/sources/messages';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './flyout.module.css';
import { useRef } from 'react';
import {
  selectSelectedCats,
  selectSelectedCatsRows,
} from '@/store/selected-cats.selectors';

const selectedCatsTableHeader = [
  'Cat breed name',
  'Description',
  'Temperament',
  'Origin country',
];

export const Flyout = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const dispatch = useAppDispatch();

  const selectedCats = useAppSelector(selectSelectedCats);
  const selectedCatRows = useAppSelector(selectSelectedCatsRows);

  const onUnselectAll = () => {
    dispatch(removeAllCats());
  };

  const onDownload = () => {
    const rows = [selectedCatsTableHeader, ...selectedCatRows];

    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${selectedCats.length}_cats.csv`;
      linkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  if (selectedCats.length > 0)
    return (
      <div className={styles.flyout}>
        <p>
          {messages.paragraphs.catsSelected}
          {' : '}
          {selectedCats.length}
        </p>
        <div className={styles.buttons}>
          <button onClick={onUnselectAll} className={styles.unselectAllBtn}>
            {messages.buttons.unselectAll}
          </button>
          <button onClick={onDownload}>{messages.buttons.download}</button>
          <a ref={linkRef} className={styles.fakeLink} />
        </div>
      </div>
    );
};
