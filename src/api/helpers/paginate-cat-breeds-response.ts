import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from '@/sources/constants';
import type { Cat } from '@/sources/types/cat';

export const paginateCatBreedsResponse = (
  response: Cat.Breed[],
  page?: number,
  limit = PAGINATION_DEFAULT_LIMIT
): Cat.BreedsResponse => {
  const safePage = page && page > 0 ? page : PAGINATION_DEFAULT_PAGE;
  const start = (safePage - 1) * limit;
  const catsPage = response.slice(start, start + limit);

  return {
    data: catsPage,
    pagination: {
      limit,
      page: safePage,
      totalItems: response.length,
      totalPages: Math.ceil(response.length / limit),
    },
  };
};
