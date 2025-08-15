import type { Metadata } from 'next';
import { messages } from './lib/messages';
import './globals.css';
import Providers from './providers';
import { Layout } from '@components/layout/layout';

export const metadata: Metadata = {
  title: messages.appName,
  description: messages.appDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>
            <div id="root">{children}</div>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
