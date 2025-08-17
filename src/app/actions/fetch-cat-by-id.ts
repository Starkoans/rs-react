import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_KEY,
  API_TAGS,
} from '@app/lib/constants';
import type { Cat } from '@app/lib/types/cat';

export const fetchCatById = async (id: string): Promise<Cat.Breed> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.breeds}/${id}`, {
    headers: { 'x-api-key': API_KEY },
    next: { tags: [API_TAGS.cats] },
  });
  const data = await response.json();
  return data;
};
