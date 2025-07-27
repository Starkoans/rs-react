import type { Cat } from '@/sources/types/cat';
import { BASE_URL, endpoints } from './api-constants';

export const fetchCatImage = async (imageId: string): Promise<Cat.Image> => {
  const response = await fetch(`${BASE_URL}${endpoints.images}/${imageId}`);
  const data = await response.json();
  return data;
};
