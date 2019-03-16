import styles from './MessageBox.css';
import React, { ReactNode } from 'react';
import cx from 'classnames';
import Icon from '../Icon';

type Props = {
  message: ReactNode;
  type: 'success' | 'warning' | 'error' | 'neutral';
  onClose?: () => void;
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
