'use client';

import type { Pagination } from '@app/lib/types/pagination';
import styles from './pagination.module.css';
import { PAGINATION_DEFAULT_PAGE, URL_SEARCH_PARAMS } from '@app/lib/constants';
import { messages } from '@app/lib/messages';
import { ArrowLeftIcon } from '@assets/arrow-left-icon';
import { ArrowRightIcon } from '@assets/arrow-right-icon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  pagination?: Pagination;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  pagination,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isVisible =
    pagination && pagination.totalPages && pagination.totalPages > 1;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(URL_SEARCH_PARAMS.page, String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    if (pagination?.page && pagination.page > PAGINATION_DEFAULT_PAGE) {
      goToPage(pagination.page - 1);
    }
  };

  const handleNext = () => {
    if (pagination?.page && pagination.page < pagination.totalPages) {
      goToPage(pagination.page + 1);
    }
  };

  if (isVisible)
    return (
      <section className={styles.container}>
        <b>
          {messages.paragraphs.totalFound}: {pagination?.totalItems}
        </b>

        <div>
          <button
            aria-label={messages.buttons.prev}
            onClick={handlePrev}
            disabled={pagination?.page === PAGINATION_DEFAULT_PAGE}
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
