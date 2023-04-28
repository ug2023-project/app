import { forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Action.module.scss';

const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ active, className, cursor, style, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={classNames(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          '--fill': active?.fill,
          '--background': active?.background,
        } as CSSProperties
      }
    />
  ),
);

export type ActionProps = React.HTMLAttributes<HTMLButtonElement> & {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
};

export default Action;
