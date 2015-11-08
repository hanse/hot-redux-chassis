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
        {React.cloneElement(this.props.children, this.props)}
        <img src={ballmer} />
      </div>
    );
  }
}
