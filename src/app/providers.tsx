'use client';

import StoreProvider from './lib/store/provider';
import { ThemeProvider } from './lib/theme/provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}
