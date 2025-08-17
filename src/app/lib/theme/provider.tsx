'use client';

import { createContext, useEffect, useState, type ReactNode } from 'react';
import { darkTheme, lightTheme } from './themes';
import { LSKeys } from '../constants';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem(LSKeys.theme);
    setTheme(saved === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const applyTheme = (themeObj: Record<string, string>) => {
    const root = document.documentElement;
    Object.entries(themeObj).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    applyTheme(theme === 'light' ? lightTheme : darkTheme);
    localStorage.setItem(LSKeys.theme, theme);
  }, [theme]);

  const value: ThemeContextProps = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
