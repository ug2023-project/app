import { ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'theme',
    defaultValue: 'dark',
    getInitialValueInEffect: false,
  });

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme]);

  const toggleColorScheme = (value?: ColorScheme) => {
    document.documentElement.classList.toggle('dark');
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return { colorScheme, toggleColorScheme };
};

export default useColorScheme;
