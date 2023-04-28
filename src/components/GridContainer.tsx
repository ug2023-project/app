import React, { PropsWithChildren } from 'react';

import styles from './GridContainer.module.scss';

type GridContainerProps = {
  columns: number;
};

const GridContainer = ({
  children,
  columns,
}: PropsWithChildren<GridContainerProps>) => (
  <ul
    className={styles.GridContainer}
    style={
      {
        '--col-count': columns,
      } as React.CSSProperties
    }
  >
    {children}
  </ul>
);

export default GridContainer;
