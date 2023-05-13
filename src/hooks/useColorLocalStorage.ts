import { useLocalStorage } from '@mantine/hooks';

const useColorLocalStorage = () => {
  const [colorsLocalStorage, setColorsLocalStorage] = useLocalStorage<string[]>(
    {
      key: 'colors-swatches',
      defaultValue: [],
    },
  );

  const handleColorLocalStorageChange = (newColor: string) => {
    setColorsLocalStorage((prev) => {
      if (prev.includes(newColor)) {
        return prev;
      }
      if (prev.length >= 10) {
        const [, ...leftColors] = prev;
        return [...leftColors, newColor];
      }
      return [...prev, newColor];
    });
  };

  return { colorsLocalStorage, handleColorLocalStorageChange };
};

export default useColorLocalStorage;
