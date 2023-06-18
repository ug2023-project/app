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
      style,
      ...props
    },
    ref,
  ) => (
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
            ...style,
            transition: [transition, wrapperStyle?.transition]
              .filter(Boolean)
              .join(', '),
            '--translate-x': transform
              ? `${Math.round(transform.x)}px`
              : undefined,
            '--translate-y': transform
              ? `${Math.round(transform.y)}px`
              : undefined,
            '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
            '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
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
          <div className={styles.imageDesc}>
            <div className={styles.thumbnail}>
              <img
                className={styles['thumbnail-img']}
                onError={({ currentTarget }) => {
                  (currentTarget as HTMLImageElement).src =
                    'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
                }}
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
                {item.title.length >= 50 === true
                  ? item.title.substring(0, 50) + '...'
                  : item.title}
              </span>
              <Text color="dimmed" size="sm">
                {item.link.substring(0, 50) + '...'}
              </Text>
              <Text color="dimmed" size="sm">
                {item.description
                  ? item.description.length >= 50 === true
                    ? item.description?.substring(0, 60) + '...'
                    : item.description
                  : 'No description'}
              </Text>
              <Text color="dimmed" size="sm">
                {new Date(item.createdAt).toLocaleString()}{' '}
                <span className={styles.tags}>
                  {item.tags.map((tag) => `#${tag} `).join('')}
                </span>
              </Text>
            </div>
          </div>
          <div className={styles.Actions}>
            <Favorite bookmark={item} className={styles.action} />
            <Edit bookmark={item} className={styles.action} />
            <Remove className={styles.action} onClick={onRemove} />
          </div>
        </div>
      </div>
    </a>
  ),
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
  style?: React.CSSProperties;
};

export default Item;
