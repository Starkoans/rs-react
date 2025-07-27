import { PAGINATION_START_PAGE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import type { Pagination } from '@/sources/types/pagination';
import styles from './pagination.module.css';

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
          onClick={handlePrev}
          disabled={pagination.page === PAGINATION_START_PAGE}
        >
          {messages.buttons.prev}
        </button>
        <p>
          {messages.paragraphs.currentPage} {pagination.page}{' '}
          {messages.paragraphs.of} {pagination.totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={pagination.page === pagination.totalPages}
        >
          {messages.buttons.next}
        </button>
      </div>
    </section>
  );
};
