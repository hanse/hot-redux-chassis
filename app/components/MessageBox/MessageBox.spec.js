// @flow

import MessageBox from './';
import { testComponentSnapshots } from 'tests/helpers';

const defaultProps = {
  message: 'Hello World',
  type: 'success'
};

describe('<MessageBox />', () => {
  testComponentSnapshots(MessageBox, [defaultProps]);
});
