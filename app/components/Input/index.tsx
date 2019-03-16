import styles from './Input.css';
import React, { HTMLProps } from 'react';

type Props = HTMLProps<HTMLInputElement>;

function Input({ className, ...props }: Props) {
  return <input type="text" className={className || styles.input} {...props} />;
}

export default Input;
