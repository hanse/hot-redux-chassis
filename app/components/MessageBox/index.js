// @flow

import styles from './MessageBox.css';
import React from 'react';
import cx from 'classnames';
import Icon from '../Icon';

type Props = {
  message: string | React.Element<*>,
  type: 'success' | 'warning' | 'error',
  onClose?: () => void
};

function MessageBox({ message, type, onClose }: Props) {
  return (
    <div className={cx(styles.messageBox, styles[type])}>
      {message}
      <button className={styles.button} onClick={onClose}>
        <Icon name="close" />
      </button>
    </div>
  );
}

export default MessageBox;
