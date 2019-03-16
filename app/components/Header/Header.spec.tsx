import React from 'react';
import { MemoryRouter } from 'react-router';
import Header from './';
import { testComponentSnapshots } from 'tests/helpers';

const Component = (props: any) => (
  <MemoryRouter>
    <Header {...props} />
  </MemoryRouter>
);

const defaultProps = {
  location: {
    search: ''
  },
  closeSearch: () => {},
  openSearch: () => {},
  searchOpen: false
};

describe('<Header />', () => {
  testComponentSnapshots(Component, [defaultProps]);
});
