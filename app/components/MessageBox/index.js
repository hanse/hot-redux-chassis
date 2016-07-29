/** @flow */

import styles from './MessageBox.css';
import React from 'react';
import cx from 'classnames';

type Props = {
  message: string | React.Element;
  type: 'success'|'warning'|'error';
  onClose: () => void;
};

function MessageBox({ message, type, onClose }: Props) {
  return (
    <div className={cx(styles.messageBox, styles[type])}>
      {message}
      <button
        className={styles.button}
        onClick={onClose}
      >X</button>
    </div>
  );
}

export default MessageBox;
