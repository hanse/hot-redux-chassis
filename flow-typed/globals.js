// @flow

declare var __DEV__: boolean;
declare var System: Object;
declare var module: {
  hot: {
    accept: (path: string, fn: () => mixed) => void
  }
};

declare var window: {
  localStorage: {
    setItem: (key: string, value: string) => void,
    getItem: (key: string) => string,
    removeItem: (key: string) => void
  },
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: ?$Compose
};
