import styles from './flyout.module.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDownloadList,
  selectDownloadListRows,
  removeAllCats,
} from '@app/lib/store/download-list';
import { messages } from '@app/lib/messages';

const downloadListTableHeader = [
  'Cat breed name',
  'Description',
  'Temperament',
  'Origin country',
];

export const Flyout = () => {
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const downloadList = useSelector(selectDownloadList);
  const downloadListRows = useSelector(selectDownloadListRows);

  const onUnselectAll = () => {
    dispatch(removeAllCats());
  };

  const onDownload = () => {
    const rows = [downloadListTableHeader, ...downloadListRows];

    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${downloadList.length}_cats.csv`;
      linkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  if (downloadList.length > 0)
    return (
      <div className={styles.flyout}>
        <p>
          {messages.paragraphs.catsSelected}
          {' : '}
          {downloadList.length}
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
