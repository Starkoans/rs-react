import { vi } from 'vitest';

export const fetchCatImageMock = vi
  .fn()
  .mockResolvedValue({ url: 'mock-image.jpg' });

vi.mock('../../api/fetch-cat-image', () => {
  return { fetchCatImage: fetchCatImageMock };
});
