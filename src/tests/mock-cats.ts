import type { Cat } from '../sources/types/cat';

export const mockCats: Cat[] = [
  {
    name: 'Valera',
    description: 'Cool cat',
    id: '1',
    image: {
      url: 'https://www.google.com/valera-the-cool-cat.jpg',
      height: 100,
      width: 100,
    },
    life_span: 'www',
    origin: 'www',
    temperament: 'lazy',
    reference_image_id: '123',
    weight: { imperial: 'www', metric: 'www' },
    wikipedia_url: 'https://wiki.com/valera-the-cool-cat.',
  },
];
