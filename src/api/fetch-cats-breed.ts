import { messages } from '../sources/messages';
import type { Cat } from '../sources/types/cat';
import { BASE_URL, endpoints } from './endpoints';

export const fetchCats = async (breed?: string): Promise<Cat[]> => {
  try {
    const url = `${BASE_URL}${endpoints.breeds}`;
    const response = await fetch(
      breed ? `${url}${endpoints.search}?q=${breed}` : url
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(messages.errors.fetchCatsBreed, error);
    throw error;
  }
};
