/** @flow */

import styles from './Input.css';
import React from 'react';

function Input({ className, ...props }: Object) {
  return (
    <input
      type="text"
      className={className || styles.input}
      {...props}
    />
  );
}

export default Input;
