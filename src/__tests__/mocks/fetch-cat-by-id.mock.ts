import { fakeCat } from '@/__tests__/mocks/cats.mock';
import { vi } from 'vitest';
export const fetchCatByIdMock = vi.fn().mockResolvedValue(fakeCat);

vi.mock('../../api/fetch-cat-by-id', () => {
  return { fetchCatById: fetchCatByIdMock };
});
