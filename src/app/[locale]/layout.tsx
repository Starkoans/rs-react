import type { Metadata } from 'next';
import { messages } from '../lib/messages';
import '../globals.css';
import { Layout } from '@components/layout/layout';
import StoreProvider from '../lib/store/provider';
import { ThemeProvider } from '../lib/theme/provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from 'i18n/routing';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: messages.appName,
  description: messages.appDescription,
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <NextIntlClientProvider>
              <Layout>
                <div id="root">{children}</div>
              </Layout>
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
