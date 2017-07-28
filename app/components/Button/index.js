// @flow

import styles from './Button.css';
import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string,
  block?: boolean
};

function Button({
  className,
  link = false,
  loading = false,
  block = false,
  children,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cx(
        className || styles.button,
        block && styles.block,
        link && styles.link
      )}
      disabled={loading}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  );
}

export default Button;
