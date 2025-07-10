import type { Cat } from '../types/cat';

const endpoint = 'https://api.thecatapi.com/v1/breeds';

export const fetchCats = async (breed: string): Promise<Cat[]> => {
  try {
    const response = await fetch(
      breed ? `${endpoint}/search?q=${breed}` : `${endpoint}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Fetch cats error:', error);
    throw error;
  }
};
