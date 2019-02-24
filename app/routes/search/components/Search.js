// @flow

import styles from './Search.css';
import React, { useEffect } from 'react';
import type { SearchResult } from 'app/types';

type Props = {
  query: string,
  results: Array<SearchResult>,
  search: (query: string) => void,
  searching: boolean,
  location: {
    search: string
  }
};

function Search({ search, query, results, searching }: Props) {
  useEffect(() => {
    search(query);
  }, [search, query]);

  return (
    <div className={styles.root}>
      <h2>
        Search <em>{query}</em>
      </h2>

      {searching ? null : (
        <>
          {results.map((result, i) => (
            <div key={result} id={`result-${i}`}>
              {result}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Search;
