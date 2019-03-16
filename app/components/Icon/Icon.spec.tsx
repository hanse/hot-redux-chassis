import Icon from './';
import { testComponentSnapshots } from 'tests/helpers';

describe('<Icon />', () => {
  testComponentSnapshots(Icon, [{ name: 'menu' }]);
});
