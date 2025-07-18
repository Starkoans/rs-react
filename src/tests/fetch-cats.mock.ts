import { vi } from 'vitest';

vi.mock('../api/fetch-cats-breed', () => ({
  fetchCats: vi.fn(),
}));

export const fetchCatsMock = vi.fn();
