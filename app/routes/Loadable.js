// @flow

import ReactLoadable from 'react-loadable';

const Loadable = (props: any) =>
  ReactLoadable({
    loading: () => null,
    delay: 200,
    ...props
  });

export default Loadable;
