// @flow

import styles from './Input.css';
import React from 'react';

type Props = {
  className?: string
};

function Input({ className, ...props }: Props) {
  return <input type="text" className={className || styles.input} {...props} />;
}

export default Input;
