// @flow

import { Observable } from 'rxjs';
import { toId } from 'app/types';
import type { Action, Epic, Post, PostDto } from 'app/types';

function extractNextPageUrl(xhr: XMLHttpRequest) {
  const linkHeader = xhr.getResponseHeader('Link');
  if (!linkHeader) {
    return null;
  }

  const links = linkHeader.split(',');

  const nextLink = links.find(link => link.includes('rel="next"'));
  if (!nextLink) {
    return null;
  }

  return nextLink
    .trim()
    .split(';')[0]
    .slice(1, -1);
}

const initialState = {
  items: [],
  nextPageUrl: '',
  pageCount: 0,
  loading: false,
  failed: false
};

type State = {
  ...typeof initialState,
  items: Array<Post>,
  nextPageUrl: ?string
};

export default function posts(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'POSTS_FETCH':
      return {
        ...state,
        failed: false,
        loading: true
      };

    case 'POSTS_REFRESH':
      return initialState;

    case 'POSTS_RECEIVED':
      return {
        ...state,
        items: state.items.concat(action.payload.items),
        nextPageUrl: action.payload.nextPageUrl,
        loading: false,
        pageCount: state.pageCount + 1
      };

    case 'POSTS_FETCH_FAILED':
      return {
        ...state,
        failed: true,
        loading: false
      };

    default:
      return state;
  }
}

export const refreshPostsEpic: Epic = action$ =>
  action$
    .filter(action => action.type === 'POSTS_REFRESH')
    .mergeMap(() => Observable.of(fetchPosts()));

export const fetchPostsEpic: Epic = (action$, store, { unsplash }) =>
  action$.filter(action => action.type === 'POSTS_FETCH').switchMap(() => {
    return unsplash
      .fetchPosts(store.getState().posts.nextPageUrl)
      .delay(1000)
      .switchMap(result =>
        Observable.of(
          postsReceived(result.response, extractNextPageUrl(result.xhr))
        )
      )
      .catch((error: Error) => Observable.of(fetchPostsFailed(error)));
  });

function mapPostDto(post: PostDto): Post {
  return {
    id: toId(post.id),
    imageUrl: post.urls.regular,
    user: {
      name: post.user.name,
      location: post.user.location,
      link: post.user.links.html
    }
  };
}

export function fetchPosts(): Action {
  return {
    type: 'POSTS_FETCH'
  };
}

export function fetchPostsFailed(error: Error): Action {
  return {
    type: 'POSTS_FETCH_FAILED',
    payload: error,
    error: true
  };
}

export function postsReceived(
  items: Array<PostDto>,
  nextPageUrl: ?string
): Action {
  return {
    type: 'POSTS_RECEIVED',
    payload: {
      items: items.map(mapPostDto),
      nextPageUrl
    }
  };
}
