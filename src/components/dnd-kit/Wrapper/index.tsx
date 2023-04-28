import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './Wrapper.module.scss';

const Wrapper = ({
  children,
  center,
  style,
}: PropsWithChildren<WrapperProps>) => (
  <div
    className={classNames(styles.Wrapper, center && styles.center)}
    style={style}
  >
    {children}
  </div>
);

type WrapperProps = {
  center?: boolean;
  style?: React.CSSProperties;
};

export default Wrapper;
