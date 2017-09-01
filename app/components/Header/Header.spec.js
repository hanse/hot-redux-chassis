import React from 'react';
import { MemoryRouter } from 'react-router';
import Header from './';
import renderer from 'react-test-renderer';

describe('<Header />', () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Header location={{ query: {} }} />
      </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
