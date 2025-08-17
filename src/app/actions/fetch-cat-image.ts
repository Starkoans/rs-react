import { API_BASE_URL, API_ENDPOINTS } from '@app/lib/constants';
import type { Cat } from '@app/lib/types/cat';

export const fetchCatImage = async (imageId: string): Promise<Cat.Image> => {
  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.images}/${imageId}`
  );
  const data = await response.json();
  return data;
};
