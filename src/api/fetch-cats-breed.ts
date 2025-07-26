import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_START_PAGE,
} from '@/sources/constants';
import { messages } from '../sources/messages';
import type { Cat } from '../sources/types/cat';
import { BASE_URL, endpoints } from './endpoints';

export const fetchCatsBreeds = async (
  breed?: string,
  page = PAGINATION_START_PAGE,
  limit = PAGINATION_DEFAULT_LIMIT
): Promise<Cat.BreedsResponse> => {
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
    const allCats: Cat.Breed[] = await response.json();

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
