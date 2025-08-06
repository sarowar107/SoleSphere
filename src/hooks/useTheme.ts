import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useTheme = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
};
