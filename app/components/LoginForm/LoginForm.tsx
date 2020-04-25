import LoginForm from './';
import { testComponentSnapshots } from 'tests/helpers';

const defaultProps = {
  onSubmit: () => {},
};

describe('<LoginForm />', () => {
  testComponentSnapshots(LoginForm, [defaultProps]);
});
