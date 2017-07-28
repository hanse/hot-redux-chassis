import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/Button';

class Feed extends Component {
  render() {
    const { onLoadMore, onRefresh } = this.props;
    return (
      <div>
        <h2
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          Recent Activity
          <Button link onClick={onRefresh} loading={this.props.refreshing}>
            Refresh
          </Button>
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button link onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    refreshing: false,
    loading: false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRefresh: () => dispatch({ type: 'FEED_REFRESH' }),
    onLoadMore: () => dispatch({ type: 'FEED_LOAD_MORE' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
