import { PAGINATION_START_PAGE, type Pagination } from '@/api/fetch-cats-breed';

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
  const handlePrevPage = () => {
    handlePrev();
  };

  const handleNextPage = () => {
    handleNext();
  };

  return (
    <div>
      <p>Total cats: {pagination.totalItems}</p>
      <p>
        Current page: {pagination.page} of {pagination.totalPages}
      </p>
      <button
        onClick={handlePrevPage}
        disabled={pagination.page === PAGINATION_START_PAGE}
      >
        Prev
      </button>
      <button
        onClick={handleNextPage}
        disabled={pagination.page === pagination.totalPages}
      >
        Next
      </button>
    </div>
  );
};
