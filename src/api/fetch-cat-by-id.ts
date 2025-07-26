import { API_KEY, BASE_URL, endpoints } from '@/api/api-constants';

export const fetchCatById = async (id: string) => {
  const response = await fetch(`${BASE_URL}${endpoints.breeds}/${id}`, {
    headers: { 'x-api-key': API_KEY },
  });
  const data = await response.json();
  return data;
};
