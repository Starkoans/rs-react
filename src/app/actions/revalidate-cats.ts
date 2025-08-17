'use server';

import { revalidateTag } from 'next/cache';
import { API_TAGS } from '@app/lib/constants';

export async function revalidateCats() {
  revalidateTag(API_TAGS.cats);
}
