import { messages } from '../sources/messages';
import type { Cat } from '../sources/types/cat';
import { BASE_URL, endpoints } from './endpoints';

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface CatsPaginated {
  data: Cat[];
  pagination: Pagination;
}

export const PAGINATION_DEFAULT_LIMIT = 4;
export const PAGINATION_START_PAGE = 1;

export const fetchCats = async (
  breed?: string,
  page = PAGINATION_START_PAGE,
  limit = PAGINATION_DEFAULT_LIMIT
): Promise<CatsPaginated> => {
  try {
    const url = breed
      ? `${BASE_URL}${endpoints.breeds}${endpoints.search}/?q=${breed}`
      : `${BASE_URL}${endpoints.breeds}`;

    const response = await fetch(url, {
      headers: {
        'x-api-key':
          'live_XU8YPpA2NSBpkAddGLPq9rzIaWdZaDfowYjnHyTBraGPTccb2gcewUvBenbVth8g',
      },
    });
    const allCats: Cat[] = await response.json();

    const start = (page - 1) * limit;
    const catsPage = allCats.slice(start, start + limit);

    return {
      data: catsPage,
      pagination: {
        limit,
        page: page,
        totalItems: allCats.length,
        totalPages: Math.ceil(allCats.length / limit),
      },
    };
  } catch (error) {
    console.log(messages.errors.fetchCatsBreed, error);
    throw error;
  }
};
