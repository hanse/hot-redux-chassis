import React, { HTMLProps } from 'react';
import styles from './HamburgerButton.css';
import cx from 'classnames';

type Props = {
  open: boolean;
} & HTMLProps<HTMLButtonElement>;

function HamburgerButton({ open, ...props }: Props) {
  return (
    <button
      className={cx(styles.hamburgerButton, open === true && styles.open)}
      {...(props as any)}
    >
      <div />
      <div />
      <div />
      <div />
    </button>
  );
}

export default HamburgerButton;
