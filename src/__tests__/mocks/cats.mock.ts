import type { Cat } from '../../sources/types/cat';

export const mockCats: Cat[] = [
  {
    id: '1',
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
  {
    id: '2',
    name: 'Siamese',
    description:
      'An elegant breed known for its vocal nature and striking appearance.',
    image: {
      url: 'https://cat.com/siamese.jpg',
      height: 120,
      width: 120,
    },
    life_span: '10-12',
    origin: 'Thailand',
    temperament: 'Active, Vocal, Social',
    reference_image_id: '789',
    weight: { imperial: '6-14', metric: '2.7-6.4' },
    wikipedia_url: 'https://en.wikipedia.org/wiki/Siamese_cat',
  },
];

export const fakeCat = mockCats[0];
