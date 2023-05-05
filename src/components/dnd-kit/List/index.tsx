import React, { forwardRef } from 'react';
import classNames from 'classnames';

import styles from './List.module.scss';

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, columns = 1, horizontal, style }: ListProps, ref) => (
    <ul
      ref={ref}
      style={
        {
          ...style,
          '--columns': columns,
        } as React.CSSProperties
      }
      className={classNames(styles.List, horizontal && styles.horizontal)}
    >
      {children}
    </ul>
  ),
);

type ListProps = {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
};

export default List;
