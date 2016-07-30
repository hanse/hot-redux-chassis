import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Header from './';
import styles from './Header.css';

describe('<Header />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.props().className).to.eql(styles.root);
  });
});
