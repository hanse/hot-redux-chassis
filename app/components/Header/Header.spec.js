import React from 'react';
import { shallow } from 'enzyme';
import Header from './';
import styles from './Header.css';

describe('<Header />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.props().className).toEqual(styles.root);
  });
});
