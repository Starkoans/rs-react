import { type FC } from 'react';
import type { Cat } from '../../app/lib/types/cat';

import { fetchCatImage } from '@app/actions/fetch-cat-image';
import { CatCardClient } from './cat-card.client';

interface Props {
  cat: Cat.Breed;
}

export const CatCardServer: FC<Props> = async ({ cat }) => {
  const catImg = cat.reference_image_id
    ? (await fetchCatImage(cat.reference_image_id)).url
    : '';

  return <CatCardClient cat={cat} catImgUrl={catImg} />;
};
