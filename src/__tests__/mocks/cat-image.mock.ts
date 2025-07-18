import type { CatImage } from '../../sources/types/cat-image';
import { fakeCat } from './cats.mock';

export const fakeCatImg: CatImage = {
  id: fakeCat.reference_image_id,
  url: 'https://cat.com/british.jpg',
  height: 700,
  width: 700,
};
