import { PAGINATION_START_PAGE } from '@/sources/constants';
import { messages } from '@/sources/messages';
import type { Pagination } from '@/sources/types/pagination';

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
  return (
    <div>
      <p>
        {messages.paragraphs.totalFound} {pagination.totalItems}
      </p>
      <p>
        {messages.paragraphs.currentPage} {pagination.page}{' '}
        {messages.paragraphs.of}
        {pagination.totalPages}
      </p>
      <button
        onClick={handlePrev}
        disabled={pagination.page === PAGINATION_START_PAGE}
      >
        {messages.buttons.prev}
      </button>
      <button
        onClick={handleNext}
        disabled={pagination.page === pagination.totalPages}
      >
        {messages.buttons.next}
      </button>
    </div>
  );
};
