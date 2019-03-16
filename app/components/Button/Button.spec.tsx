import Button from './';
import { testComponentSnapshots } from 'tests/helpers';

describe('<Button />', () => {
  testComponentSnapshots(Button, [{}]);
});
