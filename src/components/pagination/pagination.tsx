import { PAGINATION_START_PAGE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import type { Pagination } from '@/sources/types/pagination';
import styles from './pagination.module.css';
import { ArrowLeftIcon } from '@/assets/arrow-left-icon';
import { ArrowRightIcon } from '@/assets/arrow-right-icon';

interface PaginationProps {
  pagination?: Pagination;
  goToPage: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  pagination,
  goToPage,
}) => {
  const handlePrev = () => {
    if (pagination?.page && pagination.page > PAGINATION_START_PAGE) {
      goToPage(pagination.page - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.page && pagination.page < pagination.totalPages) {
      goToPage(pagination.page + 1);
    }
  };

  if (!pagination) return null;
  if (pagination.totalPages && pagination.totalPages < 2) return null;

  return (
    <section className={styles.container}>
      <b>
        {messages.paragraphs.totalFound}: {pagination?.totalItems}
      </b>

      <div>
        <button
          aria-label={messages.buttons.prev}
          onClick={handlePrev}
          disabled={pagination?.page === PAGINATION_START_PAGE}
          className={styles.paginationBth}
        >
          <ArrowLeftIcon />
        </button>
        <p>
          {messages.paragraphs.currentPage} {pagination?.page}{' '}
          {messages.paragraphs.of} {pagination?.totalPages}
        </p>
        <button
          aria-label={messages.buttons.next}
          onClick={handleNext}
          disabled={pagination?.page === pagination?.totalPages}
          className={styles.paginationBth}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </section>
  );
};
