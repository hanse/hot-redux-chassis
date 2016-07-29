/** @flow */

import styles from './Button.css';
import React from 'react';
import cx from 'classnames';

function Button({
  className,
  block = false,
  ...props
}: Object) {
  return (
    <button
      type="button"
      className={cx(
        className || styles.button,
        block && styles.block
      )}
      {...props}
    />
  );
}

export default Button;
