import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/Button';
import MessageBox from 'app/components/MessageBox';

const utmSource =
  'utm_source=hot-redux-chassis&utm_medium=referral&utm_campaign=api-credit';

class Feed extends Component {
  componentDidMount() {
    if (!this.props.hasPosts) {
      this.props.onLoadMore();
    }
  }

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
          <a
            href={`http://unsplash.com?${utmSource}`}
            style={{ textDecoration: 'none', color: '#333' }}
          >
            Unsplash
          </a>
          <Button link onClick={onRefresh} disabled={this.props.loading}>
            Refresh
          </Button>
        </h2>

        {this.props.failed ? (
          <MessageBox
            type="neutral"
            message="Failed to fetch posts from Unsplash. Maybe we have made too many requests."
          />
        ) : (
          <div>
            {this.props.posts.map(post => (
              <div key={post.id}>
                <img src={post.urls.regular} />
                <p>
                  Photo by{' '}
                  <a href={`${post.user.links.html}?${utmSource}`}>
                    {post.user.name}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button link onClick={onLoadMore} loading={this.props.loading}>
            Load More
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.items,
    loading: state.posts.loading,
    failed: state.posts.failed,
    hasPosts: state.posts.pageCount > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRefresh: () => dispatch({ type: 'POSTS_REFRESH' }),
    onLoadMore: () => dispatch({ type: 'POSTS_FETCH' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
