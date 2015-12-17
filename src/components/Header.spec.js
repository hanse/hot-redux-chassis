import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from './Header';

function setup() {
  const props = {};
  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.type).toBe('div');
      expect(output.props.className).toBe('Header');
    });
  });
});
