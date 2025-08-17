'use client';

import styles from './flyout.module.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDownloadList,
  selectDownloadListRows,
  removeAllCats,
} from '@app/lib/store/download-list';
import { messages } from '@app/lib/messages';
import { buildCatsCsv } from '@app/actions/build-csv-data-url';

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

  const onDownload = async () => {
    const rows = [downloadListTableHeader, ...downloadListRows];
    const filename = `${downloadList.length}_cats.csv`;
    const { csv } = await buildCatsCsv(rows, filename);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = filename;
      linkRef.current.click();
      setTimeout(() => URL.revokeObjectURL(url), 0);
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
