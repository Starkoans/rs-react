import { vi } from 'vitest';
import { mockCats } from './mock-cats';
import type { CatImage } from '../sources/types/cat-image';

export const fakeCat = mockCats[1];
export const fakeCatImg: CatImage = {
  id: fakeCat.reference_image_id,
  url: 'https://cat.com/british.jpg',
  height: 700,
  width: 700,
};

export const fetchCatImageMock = vi.fn().mockResolvedValue(fakeCatImg);

vi.mock('../api/fetch-cat-image', () => ({
  fetchCatImage: vi
    .fn()
    .mockResolvedValue({ url: 'https://cat.com/example.jpg' }),
}));
