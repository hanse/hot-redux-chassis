declare var __DEV__: boolean;

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'raw-loader!*' {
  const content: string;
  export default content;
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
  import<T = any>(module: string): Promise<T>;
}

declare var System: System;

declare module 'dom-scroll-into-view' {
  const scrollIntoView: (
    el: HTMLElement,
    container: HTMLElement,
    opts: { onlyScrollIfNeeded: boolean }
  ) => void;
  export default scrollIntoView;
}
