import React, { Component } from 'react';
import Header from './Header';

export default class Dashboard extends Component {
  render() {
    return (
      <div className='Dashboard'>
        <Header />
        <p>Hello World</p>
      </div>
    );
  }
}
