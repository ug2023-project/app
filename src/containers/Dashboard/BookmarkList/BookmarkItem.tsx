import { Draggable } from 'react-beautiful-dnd';
import { createStyles, Text } from '@mantine/core';
import Bookmark from '@/types/Bookmark';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { emphasizeText } from '@/utils/emphasizeText';
import styles from './BookmarkItem.module.css';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
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
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

const BookmarkItem = ({ index, item }: Props) => {
  const { classes, cx } = useStyles();
  const [searchParams] = useSearchParams();
  const isSearchResult = useMemo(
    () => [...searchParams.keys()].length > 0,
    [searchParams],
  );

  return (
    <Draggable
      index={index}
      draggableId={item.id.toString()}
      isDragDisabled={isSearchResult}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Text className={classes.symbol}>{item.id}</Text>
          <div>
            {emphasizeText(item.title).map((entry, index) =>
              entry.bold ? (
                <span key={index} className={styles.titleBold}>
                  {entry.text}
                </span>
              ) : (
                entry.text
              ),
            )}
            <Text color="dimmed" size="sm">
              {item.link}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  );
};

type Props = {
  index: number;
  item: Bookmark;
};

export default BookmarkItem;
