import { fetchCatById } from '@app/actions/fetch-cat-by-id';
import { CatDetailClient } from '@components/cat-detail/cat-detail-client';
import { fetchCatImage } from '@app/actions/fetch-cat-image';
import { URL_SEARCH_PARAMS } from '@app/lib/constants';
import { notFound } from 'next/navigation';

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Detail({ searchParams }: Props) {
  const catParam = searchParams[URL_SEARCH_PARAMS.cat];
  const catId =
    typeof catParam === 'string'
      ? catParam
      : Array.isArray(catParam)
        ? (catParam[0] ?? '')
        : '';

  if (!catId) return null;

  const cat = await fetchCatById(catId);
  if (!cat) return notFound();

  const imgUrl = cat?.reference_image_id
    ? (await fetchCatImage(cat.reference_image_id)).url
    : '';

  return <CatDetailClient cat={cat} imgUrl={imgUrl} />;
}
