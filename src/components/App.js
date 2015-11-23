import './App.css';
import React, { PropTypes, Component } from 'react';
import Header from './Header';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='App'>
        <Header />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
