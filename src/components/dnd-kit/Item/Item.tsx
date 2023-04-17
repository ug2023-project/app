import React, { useEffect } from 'react';
import classNames from 'classnames';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';
import { Remove } from './components';
import styles from './Item.module.css';
import Bookmark from '@/types/Bookmark';
import { Image, Text } from '@mantine/core';
import { emphasizeText } from '@/utils/emphasizeText';

export interface Props {
  item: Bookmark;
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  onRemove?(): void;
}

export const Item = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    (
      {
        item,
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        index,
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
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
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
              color && styles.color,
            )}
            data-cypress="draggable-item"
            {...listeners}
            {...props}
            tabIndex={0}
          >
            <Image
              width={40}
              height={40}
              mx="auto"
              radius="md"
              src={item.image}
              alt={item.title}
              withPlaceholder
            />
            <div
              style={{
                marginLeft: 10,
              }}
            >
              {emphasizeText(item.title).map((entry, index) =>
                entry.bold ? (
                  <span key={index} className={styles.titleBold}>
                    {entry.text}
                  </span>
                ) : (
                  entry.text
                ),
              )}
              <a href={item.link} target="_blank" rel="noreferrer">
                <Text color="dimmed" size="sm">
                  {item.link}
                </Text>
              </a>
            </div>
          </div>
          <span className={styles.Actions}>
            <Remove className={styles.Remove} onClick={onRemove} />
          </span>
        </div>
      );
    },
  ),
);
