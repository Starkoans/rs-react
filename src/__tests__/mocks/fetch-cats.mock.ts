import { vi } from 'vitest';
export const fetchCatsMock = vi.fn();

vi.mock('../../api/fetch-cats-breed', () => {
  return { fetchCats: fetchCatsMock };
});
