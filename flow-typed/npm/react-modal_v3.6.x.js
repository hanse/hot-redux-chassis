// flow-typed signature: f4f6175f58a082cd35c46973b6b5804b
// flow-typed version: 328b628a6f/react-modal_v3.6.x/flow_>=v0.54.1

declare module 'react-modal' {
  declare type ModalProps = {
    isOpen?: boolean,
    portalClassName?: string,
    bodyOpenClassName?: string,
    ariaHideApp?: boolean,
    closeTimeoutMS?: number,
    shouldFocusAfterRender?: boolean,
    shouldCloseOnEsc?: boolean,
    shouldCloseOnOverlayClick?: boolean,
    shouldReturnFocusAfterClose?: boolean,
    parentSelector?: () => HTMLElement | null,
    style?: {
      content?: {
        [key: string]: string | number
      },
      overlay?: {
        [key: string]: string | number
      }
    },
    className?: string | {
      base: string,
      afterOpen: string,
      beforeClose: string
    },
    overlayClassName?: string | {
      base: string,
      afterOpen: string,
      beforeClose: string
    },
    onAfterOpen?: () => void | Promise<void>,
    onRequestClose?: (SyntheticEvent<>) => void,
    aria?: {
      [key: string]: string
    },
    role?: string,
    contentLabel?: string,
    overlayRef?: (node: ?HTMLElement) => mixed,
    containerRef?: (node: ?HTMLElement) => mixed,
  };

  declare class Modal extends React$Component<ModalProps> {
    static setAppElement(element: HTMLElement | string | null): void;
  }

  declare module.exports: typeof Modal;
}
