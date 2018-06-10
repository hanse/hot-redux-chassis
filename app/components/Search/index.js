// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import scrollIntoView from 'dom-scroll-into-view';
import { search, searchResultSelected } from 'app/state/search';
import Icon from 'app/components/Icon';
import styles from './Search.css';
import type { State as RootState, SearchResult } from 'app/types';

type Props = {
  query: string,
  search: (query: string) => any,
  results: Array<SearchResult>,
  onClose: () => void,
  searchResultSelected: (result: SearchResult) => any
};

type State = {
  selectedIndex: number,
  query: string
};

class Search extends Component<Props, State> {
  state = {
    selectedIndex: -1,
    query: this.props.query || ''
  };

  itemRefs: { [key: string]: ?HTMLElement } = {};

  searchInput: ?HTMLInputElement;

  componentDidMount() {
    this.search(this.state.query);
    this.searchInput &&
      this.searchInput.setSelectionRange(0, this.state.query.length);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query && prevProps.query !== this.props.query) {
      this.search(this.props.query);
    }

    this.scrollToSelectedIndex();
  }

  scrollToSelectedIndex = () => {
    if (this.state.selectedIndex < 0) {
      return;
    }

    const itemNode = this.itemRefs[`item-${this.state.selectedIndex}`];
    const containerNode = this.itemRefs.container;

    scrollIntoView(itemNode, containerNode, { onlyScrollIfNeeded: true });
  };

  handleChange = ({ target: { value } }) => {
    this.search(value);
  };

  search(query) {
    this.setState({ query });
    this.props.search(query);
  }

  handleKeyDown = (e: SyntheticKeyboardEvent<*>) => {
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
            props.results.length - 1,
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
          this.props.results[this.state.selectedIndex]
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
            ref={ref => (this.searchInput = ref)}
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

        <div
          className={styles.itemList}
          ref={ref => (this.itemRefs.container = ref)}
        >
          {this.state.query !== '' &&
            this.props.results.length === 0 && (
              <div style={{ padding: 20 }}>
                <strong>No suggestions found</strong>
              </div>
            )}

          {this.props.results.map((result, i) => (
            <a
              ref={ref => (this.itemRefs[`item-${i}`] = ref)}
              key={result}
              onClick={() => this.props.searchResultSelected(result)}
              onMouseEnter={() => this.setState({ selectedIndex: i })}
              className={
                i === this.state.selectedIndex
                  ? styles.selectedItem
                  : styles.item
              }
            >
              {result}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    results: state.search
  };
}

const mapDispatchToProps = {
  search,
  searchResultSelected
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
