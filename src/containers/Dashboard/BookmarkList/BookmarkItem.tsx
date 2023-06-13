import { createStyles, Text } from '@mantine/core';
import Bookmark from '@/types/Bookmark';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
    opacity: 0.5,
    height: '20px',
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

const BookmarkItem = ({ item }: BookmarkItemProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Text className={classes.symbol}>{item.id}</Text>
      <div>
        entry.text
        <a href={item.link} target="_blank" rel="noreferrer">
          <Text color="dimmed" size="sm">
            {item.link}
          </Text>
        </a>
      </div>
    </>
  );
};

type BookmarkItemProps = {
  item: Bookmark;
};

export default BookmarkItem;
