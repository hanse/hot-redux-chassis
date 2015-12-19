import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import styles from './Header.css';

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.type()).toBe('div');
      expect(wrapper.props().className).toBe(styles.root);
    });
  });
});
