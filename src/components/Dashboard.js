import React, { Component, PropTypes } from 'react';
import Header from './Header';

export default class Dashboard extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className='Dashboard'>
        <Header />
        <p>Hello World {this.props.username}</p>
      </div>
    );
  }
}
