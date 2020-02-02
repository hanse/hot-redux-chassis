import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.css';
import Icon from '../Icon';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
  title?: ReactNode;
};

function Modal({ isOpen, onDismiss, children, title }: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onDismiss}
      overlayClassName={styles.backdrop}
      className={styles.dialog}
    >
      {title && (
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
      )}
      <div className={styles.content}>{children}</div>
      <button className={styles.closeButton} onClick={onDismiss}>
        <Icon name="close" />
      </button>
    </ReactModal>
  );
}

export default Modal;
