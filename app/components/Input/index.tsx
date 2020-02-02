import React, { HTMLProps, ReactNode } from 'react';
import styles from './Input.css';

type Props = HTMLProps<HTMLInputElement> & {
  label?: ReactNode;
};

function Input({ className, label, ...props }: Props) {
  return (
    <>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <input type="text" className={className || styles.input} {...props} />
    </>
  );
}

export default Input;
