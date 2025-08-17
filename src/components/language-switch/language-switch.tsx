'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const otherLocale = locale === 'en' ? 'ru' : 'en';

  const newPath = `/${otherLocale}${pathname.replace(/^\/(en|ru)/, '')}`;

  return <Link href={newPath}>{otherLocale.toUpperCase()}</Link>;
}
