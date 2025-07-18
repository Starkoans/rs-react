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
  {
    id: '2',
    name: 'British Shorthair',
    description: 'A calm and affectionate breed with a dense coat.',
    image: {
      url: 'https://cat.com/british.jpg',
      height: 120,
      width: 120,
    },
    life_span: '12-17',
    origin: 'United Kingdom',
    temperament: 'Affectionate, Easy Going, Loyal',
    reference_image_id: '456',
    weight: { imperial: '7-17', metric: '3-8' },
    wikipedia_url: 'https://en.wikipedia.org/wiki/British_Shorthair',
  },
];
