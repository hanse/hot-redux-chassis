import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/Button';
import MessageBox from 'app/components/MessageBox';
import { idToString } from 'app/types';
import { Post, State as RootState } from 'app/types';
import styles from './Feed.css';

const utmSource =
  'utm_source=hot-redux-chassis&utm_medium=referral&utm_campaign=api-credit';

type Props = {
  onLoadMore: () => any;
  onRefresh: () => any;
  hasPosts: boolean;
  loading: boolean;
  failed: boolean;
  posts: Array<Post>;
};

function Feed(props: Props) {
  const { hasPosts, onLoadMore } = props;

  useEffect(() => {
    if (!hasPosts) {
      onLoadMore();
    }
  }, [hasPosts, onLoadMore]);

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
        <div className={styles.postsContainer}>
          {props.posts.map(post => (
            <div className={styles.post}>
              <div key={idToString(post.id)} className={styles.crop}>
                <img src={post.imageUrl} alt={post.user.name} />
                <div className={styles.metadata}>
                  <span>
                    Photo by{' '}
                    <a href={`${post.user.link}?${utmSource}`}>
                      {post.user.name}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
