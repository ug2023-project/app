import React, { forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';
import styles from './Item.module.css';
import Bookmark from '@/types/Bookmark';
import { Text } from '@mantine/core';
import Remove from './components/Remove';
import Edit from './components/Edit';
import Favorite from './components/Favorite';

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      item,
      dragOverlay,
      dragging,
      disabled,
      fadeIn,
      listeners,
      onRemove,
      sorting,
      transition,
      transform,
      wrapperStyle,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      if (!dragOverlay) {
        return;
      }

      document.body.style.cursor = 'grabbing';

      return () => {
        document.body.style.cursor = '';
      };
    }, [dragOverlay]);

    return (
      <a href={item.link} target="_blank" rel="noreferrer">
        <div
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              // '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
              // '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
            )}
            data-cypress="draggable-item"
            {...listeners}
            {...props}
            tabIndex={0}
          >
            <div className={styles.thumbnail}>
              <img
                className={styles['thumbnail-img']}
                src={item.image}
                alt={item.title}
              />
            </div>

            <div
              style={{
                marginLeft: 10,
              }}
            >
              <span key={item.id} className={styles.titleBold}>
                {item.title}
              </span>

              <Text color="dimmed" size="sm">
                {item.link}
              </Text>
            </div>
          </div>
          <div className={styles.Actions}>
            <Favorite bookmark={item} className={styles.action} />
            <Edit bookmark={item} className={styles.action} />
            <Remove className={styles.action} onClick={onRemove} />
          </div>
        </div>
      </a>
    );
  },
);

type ItemProps = {
  item: Bookmark;
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  height?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  onRemove?(): void;
};

export default Item;
