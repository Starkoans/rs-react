import type { Cat } from '@/sources/types/cat';
import { fakeCat } from './cats.mock';

export const fakeCatImg: Cat.Image = {
  id: fakeCat.reference_image_id ?? '',
  url: 'https://cat.com/british.jpg',
  height: 700,
  width: 700,
};
