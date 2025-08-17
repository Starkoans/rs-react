import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_KEY,
  API_TAGS,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from '@app/lib/constants';
import type { Cat } from '@app/lib/types/cat';
import { paginateCatBreedsResponse } from '../lib/utils/paginate-cat-breeds-response';

export const fetchCatsByBreed = async (
  breed?: string,
  page: string | number = PAGINATION_DEFAULT_PAGE,
  limit = PAGINATION_DEFAULT_LIMIT
): Promise<Cat.BreedsResponse> => {
  const url = breed
    ? `${API_BASE_URL}${API_ENDPOINTS.breeds}${API_ENDPOINTS.search}/?q=${breed}`
    : `${API_BASE_URL}${API_ENDPOINTS.breeds}`;

  const response = await fetch(url, {
    headers: { 'x-api-key': API_KEY },
    next: { tags: [API_TAGS.cats] },
  });

  const cats: Cat.Breed[] = await response.json();

  return paginateCatBreedsResponse(cats, Number(page), limit);
};
