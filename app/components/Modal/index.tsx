import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.css';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
};

function Modal({ isOpen, onDismiss, children }: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onDismiss}
      overlayClassName={styles.backdrop}
      className={styles.content}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
