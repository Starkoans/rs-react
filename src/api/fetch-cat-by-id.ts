import { API_KEY, BASE_URL, endpoints } from '@/api/api-constants';
import type { Cat } from '@/sources/types/cat';

export const fetchCatById = async (id: string): Promise<Cat.Breed> => {
  const response = await fetch(`${BASE_URL}${endpoints.breeds}/${id}`, {
    headers: { 'x-api-key': API_KEY },
  });
  const data = await response.json();
  return data;
};
