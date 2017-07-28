// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { search, clearSearch } from 'app/state/search';
import Icon from 'app/components/Icon';
import styles from './Search.css';

type Props = {
  query: string,
  search: (query: string) => any,
  results: List<*>,
  onClose: () => any,
  searchResultSelected: (result: any) => any
};

class Search extends Component {
  props: Props;

  state = {
    selectedIndex: -1,
    query: this.props.query || ''
  };

  componentDidMount() {
    this.search(this.state.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query && this.props.query !== nextProps.query) {
      this.search(nextProps.query);
    }
  }

  handleChange = ({ target: { value } }) => {
    this.search(value);
  };

  search(query) {
    this.setState({ query });
    this.props.search(query);
  }

  handleKeyDown = e => {
    switch (e.which) {
      case 38:
        e.preventDefault();
        this.setState(state => ({
          selectedIndex: Math.max(-1, state.selectedIndex - 1)
        }));
        break;

      case 40:
        e.preventDefault();
        this.setState((state, props) => ({
          selectedIndex: Math.min(
            props.results.size - 1,
            state.selectedIndex + 1
          )
        }));
        break;

      case 13:
        e.preventDefault();

        if (this.state.selectedIndex === -1) {
          return this.props.searchResultSelected(this.state.query);
        }

        this.props.searchResultSelected(
          this.props.results.get(this.state.selectedIndex)
        );
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div
        className={styles.overlay}
        onKeyDown={this.handleKeyDown}
        tabIndex={-1}
        role="menu"
      >
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What are you looking for?"
            value={this.state.query}
            onChange={this.handleChange}
            autoFocus
          />

          <button onClick={this.props.onClose} className={styles.closeButton}>
            <Icon name="close" />
          </button>
        </div>

        <div className={styles.itemList}>
          {this.state.query !== '' &&
            this.props.results.size === 0 &&
            <div style={{ padding: 20 }}>
              <strong>No suggestions found</strong>
            </div>}
          {this.props.results.map((result, i) =>
            <a
              key={result}
              onClick={() => this.props.searchResultSelected(result)}
              className={
                i === this.state.selectedIndex
                  ? styles.selectedItem
                  : styles.item
              }
            >
              {result}
            </a>
          )}
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
  clearSearch,
  searchResultSelected: result => ({
    type: 'SEARCH_RESULT_SELECTED',
    payload: result
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
