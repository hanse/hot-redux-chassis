// @flow

import styles from './Search.css';
import React, { Component } from 'react';
import type { SearchResult } from 'app/types';

type Props = {
  query: string,
  results: Array<SearchResult>,
  search: (query: string) => void,
  location: {
    search: string
  }
};

export default class Search extends Component<Props> {
  componentDidMount() {
    this.props.search(this.props.query);
  }

  render() {
    const { query, results } = this.props;
    return (
      <div className={styles.root}>
        <h2>
          Search <em>{query}</em>
        </h2>

        {results.map((result, i) => (
          <div key={result} id={`result-${i}`}>
            {result}
          </div>
        ))}
      </div>
    );
  }
}
