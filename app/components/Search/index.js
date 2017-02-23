// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search, clearSearch } from 'app/state/search';
import Icon from 'app/components/Icon';
import styles from './Search.css';

class Search extends Component {
  state = {
    selectedIndex: 0
  };

  componentDidMount() {
    this.search(this.props.query);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      this.search(nextProps.query);
    }
  }

  handleChange = ({ target: { value } }) => {
    this.search(value);
  };

  search(query) {
    this.props.search(query);
  }

  handleKeyDown = e => {
    switch (e.which) {
      case 38:
        e.preventDefault();
        this.setState(state => ({
          selectedIndex: Math.max(0, state.selectedIndex - 1)
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
      >
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What are you looking for?"
            defaultValue={this.props.query}
            onChange={this.handleChange}
            autoFocus
          />

          <button onClick={this.props.onClose} className={styles.closeButton}>
            <Icon name="close" />
          </button>
        </div>

        <div className={styles.itemList}>
          {this.props.results.map((result, i) =>
            <div
              key={i}
              className={
                i === this.state.selectedIndex
                  ? styles.selectedItem
                  : styles.item
              }
            >
              {result}
            </div>
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
  clearSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
