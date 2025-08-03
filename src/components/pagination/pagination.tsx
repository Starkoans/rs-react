import { PAGINATION_START_PAGE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import type { Pagination } from '@/sources/types/pagination';
import styles from './pagination.module.css';
import { ArrowLeftIcon } from '@/assets/arrow-left-icon';
import { ArrowRightIcon } from '@/assets/arrow-right-icon';

interface PaginationProps {
  pagination: Pagination;
  handlePrev: () => void;
  handleNext: () => void;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  pagination,
  handleNext,
  handlePrev,
}) => {
  if (pagination.totalPages < 2) return null;

  return (
    <section className={styles.container}>
      <b>
        {messages.paragraphs.totalFound}: {pagination.totalItems}
      </b>

      <div>
        <button
          aria-label={messages.buttons.prev}
          onClick={handlePrev}
          disabled={pagination.page === PAGINATION_START_PAGE}
          className={styles.paginationBth}
        >
          <ArrowLeftIcon />
        </button>
        <p>
          {messages.paragraphs.currentPage} {pagination.page}{' '}
          {messages.paragraphs.of} {pagination.totalPages}
        </p>
        <button
          aria-label={messages.buttons.next}
          onClick={handleNext}
          disabled={pagination.page === pagination.totalPages}
          className={styles.paginationBth}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </section>
  );
};
