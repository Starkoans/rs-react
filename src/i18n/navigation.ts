import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;
export const localePrefix = 'always';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix,
});
