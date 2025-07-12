import { messages } from '../sources/messages';
import type { CatImage } from '../sources/types/cat-image';
import { BASE_URL, endpoints } from './endpoints';

export const fetchCatImage = async (imageId: string): Promise<CatImage> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoints.images}/${imageId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(messages.errors.fetchCatsImage, error);
    throw error;
  }
};
