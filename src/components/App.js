import './App.css';
import React, { PropTypes, Component } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='App'>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
