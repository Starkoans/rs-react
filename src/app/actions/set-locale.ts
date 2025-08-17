'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function setLocale(locale: string) {
  (await cookies()).set('locale', locale, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}
