import { messages } from '../sources/messages';
import { BASE_URL, endpoints } from './endpoints';

export const fetchCatImage = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoints.images}${endpoints.search}`
    );
    const data = await response.json();
    return data[0].url;
  } catch (error) {
    console.log(messages.errors.fetchCatsImage, error);
    throw error;
  }
};
