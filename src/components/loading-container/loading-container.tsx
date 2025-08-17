import { Spinner } from '@components/spinner/spinner';
import styles from './loading-container.module.css';

export const LoadingContainer = () => {
  return (
    <section className={styles.spinnerContainer}>
      <Spinner />
    </section>
  );
};
