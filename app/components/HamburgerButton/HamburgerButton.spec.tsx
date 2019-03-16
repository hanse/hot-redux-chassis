import HamburgerButton from './';
import { testComponentSnapshots } from 'tests/helpers';

describe('<HamburgerButton />', () => {
  testComponentSnapshots(HamburgerButton, [{ open: false }, { open: true }]);
});
