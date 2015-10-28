import React, { PropTypes, Component } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className='App'>
        {this.props.children}
      </div>
    );
  }
}
