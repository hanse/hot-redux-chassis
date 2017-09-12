// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/Button';
import MessageBox from 'app/components/MessageBox';
import { idToString } from 'app/types';
import type { Post } from 'app/types';

const utmSource =
  'utm_source=hot-redux-chassis&utm_medium=referral&utm_campaign=api-credit';

type Props = {
  onLoadMore: () => void,
  onRefresh: () => void,
  hasPosts: boolean,
  loading: boolean,
  failed: boolean,
  posts: Array<Post>
};

class Feed extends Component<Props> {
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
              <div key={idToString(post.id)}>
                <img src={post.imageUrl} alt={post.user.name} />
                <p>
                  Photo by{' '}
                  <a href={`${post.user.link}?${utmSource}`}>
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

const onRefresh = () => ({ type: 'POSTS_REFRESH' });
const onLoadMore = () => ({ type: 'POSTS_FETCH' });

const mapDispatchToProps = { onRefresh, onLoadMore };

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
