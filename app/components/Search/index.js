// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search, clearSearch } from 'app/state/search';
import styles from './Search.css';

class Search extends Component {
  handleChange = (e) => {
    this.props.search(e.target.value);
  };

  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.inputContainer}>
          <input
            type="search"
            placeholder="What are you looking for?"
            defaultValue={this.props.query}
            onChange={this.handleChange}
            autoFocus
          />
        </div>

        <div className={styles.itemList}>
          {this.props.results.map((result, i) => (
            <div key={i} className={styles.item}>{result}</div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.search
  };
}

const mapDispatchToProps = {
  search,
  clearSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
