// @flow

declare var __DEV__: boolean;
declare var System: Object;
declare var module: {
  hot: {
    accept: (path: string, fn: () => mixed) => void
  }
};
