import './App.css';
import React, { PropTypes, Component } from 'react';
import ballmer from 'assets/ballmer.jpg';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='App'>
        {this.props.children}
        <img src={ballmer} />
      </div>
    );
  }
}
