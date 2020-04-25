import MessageBox from './';
import { testComponentSnapshots } from 'tests/helpers';

const defaultProps = {
  message: 'Hello World',
  type: 'success' as 'success',
};

describe('<MessageBox />', () => {
  testComponentSnapshots(MessageBox, [defaultProps]);
});
