import { useContext } from 'react';
import { ThemeContext } from './provider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('No theme');
  return context;
};
