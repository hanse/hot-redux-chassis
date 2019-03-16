import React, { ComponentType } from 'react';
import renderer from 'react-test-renderer';

export function testComponentSnapshots<Props>(
  Component: ComponentType<Props>,
  tests: Array<Props>
) {
  return it('should match snapshot', () => {
    for (const props of tests) {
      const component = renderer.create(<Component {...props} />);
      expect(component.toJSON()).toMatchSnapshot();
    }
  });
}
