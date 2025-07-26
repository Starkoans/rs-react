import { vi } from 'vitest';
export const fetchCatsBreedsMock = vi.fn();

vi.mock('../../api/fetch-cats-breed', () => {
  return { fetchCatsBreeds: fetchCatsBreedsMock };
});
