import styles from './spinner.module.css';
import { CatIcon } from '@assets/cat-icon';

export function Spinner() {
  return (
    <div className={styles.spinner}>
      <CatIcon />
    </div>
  );
}
