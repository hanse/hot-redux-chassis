// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/Button';
import MessageBox from 'app/components/MessageBox';
import { idToString } from 'app/types';
import type { Post, State as RootState } from 'app/types';

const utmSource =
  'utm_source=hot-redux-chassis&utm_medium=referral&utm_campaign=api-credit';

type Props = {
  onLoadMore: () => any,
  onRefresh: () => any,
  hasPosts: boolean,
  loading: boolean,
  failed: boolean,
  posts: Array<Post>
};

function Feed(props: Props) {
  useEffect(() => {
    if (!props.hasPosts) {
      props.onLoadMore();
    }
  }, []);

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
        <Button link onClick={props.onRefresh} disabled={props.loading}>
          Refresh
        </Button>
      </h2>

      {props.failed ? (
        <MessageBox
          type="neutral"
          message="Failed to fetch posts from Unsplash. Maybe we have made too many requests."
        />
      ) : (
        <div>
          {props.posts.map(post => (
            <div key={idToString(post.id)}>
              <img src={post.imageUrl} alt={post.user.name} />
              <p>
                Photo by{' '}
                <a href={`${post.user.link}?${utmSource}`}>{post.user.name}</a>
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button link onClick={props.onLoadMore} loading={props.loading}>
          Load More
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps(state: RootState) {
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

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
