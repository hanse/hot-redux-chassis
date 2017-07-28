// @flow

import styles from './Search.css';
import React, { Component } from 'react';
import qs from 'query-string';

type Props = {
  location: any
};

export default class Search extends Component {
  props: Props;

  render() {
    const query = qs.parse(this.props.location.search).q;
    return (
      <div className={styles.root}>
        <h2>
          Search <em>{query}</em>
        </h2>
      </div>
    );
  }
}
