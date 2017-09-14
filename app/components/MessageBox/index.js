// @flow

import styles from './MessageBox.css';
import React, { type Node } from 'react';
import cx from 'classnames';
import Icon from '../Icon';

type Props = {
  message: Node,
  type: 'success' | 'warning' | 'error' | 'neutral',
  onClose?: () => mixed
};

function MessageBox({ message, type, onClose }: Props) {
  return (
    <div className={cx(styles.messageBox, styles[type])}>
      {message}
      {onClose && (
        <button className={styles.button} onClick={onClose}>
          <Icon name="close" />
        </button>
      )}
    </div>
  );
}

export default MessageBox;
