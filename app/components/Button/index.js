// @flow

import styles from './Button.css';
import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string,
  block?: boolean
};

function Button({ className, block = false, ...props }: Props) {
  return (
    <button
      type="button"
      className={cx(className || styles.button, block && styles.block)}
      {...props}
    />
  );
}

export default Button;
