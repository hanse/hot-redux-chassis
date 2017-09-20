// @flow

import styles from './HamburgerButton.css';
import React from 'react';
import cx from 'classnames';

type Props = {
  open: boolean
};

function HamburgerButton({ open, ...props }: Props) {
  return (
    <div
      className={cx(styles.hamburgerButton, open === true && styles.open)}
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
