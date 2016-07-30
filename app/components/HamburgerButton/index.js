/** @flow */

import styles from './HamburgerButton.css';
import React from 'react';
import cx from 'classnames';

function HamburgerButton({ open, ...props }) {
  return (
    <div
      className={cx(
        styles.hamburgerButton,
        open && styles.open
      )}
      aria-role="button"
      {...props}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default HamburgerButton;
